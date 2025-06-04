import express from "express";
import { body, validationResult } from "express-validator";
import User from "../../models/User/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import loginLimiter from "../../middleware/loginLimiter.js";
import { sendEmail } from "../../utility/emailService.js";
import moment from "moment-timezone";
import verifyFirebaseToken from "../../middleware/verifyFirebaseToken.js";
import fetchUser from "../../middleware/fetchUser.js";

const router = express.Router();

// route for craete user
router.post(
  "/create",
  [
    body("first_name")
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters"),
    body("second_name")
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Second name must be at least 3 characters"),
    body("username")
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters"),
    body("email")
      .notEmpty()
      .isEmail()
      .withMessage("Please enter a valid email address"),
    body("password")
      .notEmpty()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/\d/)
      .withMessage("Password must contain at least one number")
      .matches(/[@#]/)
      .withMessage("Password must contain at least one special character"),
  ],
  async (req, res) => {
    const numberOfUser = 10;
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    try {
      // Check the total number of accounts
      const accountCount = await User.countDocuments();
      if (accountCount >= numberOfUser) {
        return res.status(400).json({
          errors: [{ msg: "Only one account can be created in the system." }],
        });
      }

      const { first_name, second_name, username, email, password } = req.body;

      // Generate JWT token for email verification
      const jwtSecret = process.env.JWT_SECRET_KEY;

      const payload = {
        first_name,
        second_name,
        username,
        email,
        password,
      };

      const verifyToken = jwt.sign(payload, jwtSecret, { expiresIn: "10m" });

      const verifyLink = `${process.env.FRONTEND_URL}/verify-account?token=${verifyToken}`;
      const subject = "Verify Your Account";
      const message = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
          }
          .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .email-header {
            background-color: #4CAF50;
            color: #fff;
            padding: 20px;
            text-align: center;
          }
          .email-body {
            padding: 20px;
            line-height: 1.6;
          }
          .email-footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #888;
          }
          .verify-button {
            display: inline-block;
            padding: 12px 25px;
            font-size: 16px;
            color: #fff;
            background-color: #4CAF50;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
          }
          .verify-button:hover {
            background-color: #45a049;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <h1>Welcome, ${first_name}!</h1>
          </div>
          <div class="email-body">
            <p>Thank you for signing up. We are excited to have you on board!</p>
            <p>To complete your registration and verify your account, please click the button below:</p>
            <a href="${verifyLink}" class="verify-button">Verify Account</a>
            <p>If the button above doesn't work, you can copy and paste the following link into your browser:</p>
            <p style="word-wrap: break-word; color: #4CAF50;">${verifyLink}</p>
            <p>This link will expire in 10 minutes for your security.</p>
          </div>
          <div class="email-footer">
            <p>Need help? Contact our support team at support@example.com</p>
            <p>&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
      `;

      // Send the verification email
      const emailSent = await sendEmail(email, subject, message);

      if (!emailSent) {
        return res.status(500).json({
          message: "Failed to send verification email. Please try again.",
        });
      }

      return res.status(200).json({
        message: "Verification email sent. Please check your inbox.",
        token: verifyToken,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Error creating user" });
    }
  }
);

// route for save user after the verification link
router.get("/verify-account", async (req, res) => {
  try {
    const { token } = req.query; // Token from the verification link
    
    const jwtSecret = process.env.JWT_SECRET_KEY;

    const decoded = jwt.verify(token, jwtSecret);

    const { first_name, second_name, username, email, password } = decoded;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Verification Failed. Email already verified or in use.",
      });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save the user to the database
    const newUser = new User({
      first_name,
      second_name,
      username,
      email,
      password: hashedPassword,
      SignInWith: "Email Account",
      verifyStatus: "Verified",
      verified_at: moment.tz("Asia/Karachi").format("HH:mm:ss YYYY/MM/DD"),
    });

    await newUser.save();

    res.status(200).json({
      message:
        "Account Verified. Your account has been successfully verified. You can now log in.",
    });

    const subject = "Account Verified Successfully";
    const message = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      color: #333;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .email-header {
      background-color: #4CAF50;
      color: #fff;
      padding: 20px;
      text-align: center;
    }
    .email-body {
      padding: 20px;
      line-height: 1.6;
    }
    .email-footer {
      background-color: #f1f1f1;
      text-align: center;
      padding: 10px;
      font-size: 12px;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Congratulations, ${first_name}!</h1>
    </div>
    <div class="email-body">
      <p>Your account has been successfully verified.</p>
      <p>You can now fully enjoy all the features and benefits of your account.</p>
      <p>If you have any questions, feel free to reach out to our support team at any time.</p>
    </div>  
    <div class="email-footer">
      <p>Need help? Contact our support team at support@example.com</p>
      <p>&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `;

    // Send the verification email
    const emailSent = await sendEmail(email, subject, message);

    if (!emailSent) {
      return res.status(500).json({
        message: "Failed to send verification email. Please try again.",
      });
    }
  } catch (error) {
    console.error("Verification Error:", error);
    res
      .status(500)
      .json({ message: "Verification Failed. Invalid or expired token." });
  }
});

// Route for admin user login
router.post(
  "/login",
  loginLimiter,
  [
    body("username", "Username is required").notEmpty(),
    body("password", "Password must be at least 5 characters")
      .notEmpty()
      .isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { username, password } = req.body;

      const jwtSecret = process.env.JWT_SECRET_KEY;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid username or password" }] });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid username or password" }] });
      }

      // Check account verification status
      if (user.verifyStatus !== "Verified") {
        const verificationToken = jwt.sign({ email: user.email }, jwtSecret, {
          expiresIn: "10m",
        });
        console.log(verificationToken);
        const verifyLink = `${process.env.FRONTEND_URL}/verify-account?token=${verificationToken}`;

        const subject = "Resend: Verify Your Account";
        const message = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
              }
              .email-container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                overflow: hidden;
              }
              .email-header {
                background-color: #4CAF50;
                color: #fff;
                padding: 20px;
                text-align: center;
              }
              .email-body {
                padding: 20px;
                line-height: 1.6;
              }
              .email-footer {
                background-color: #f1f1f1;
                text-align: center;
                padding: 10px;
                font-size: 12px;
                color: #888;
              }
              .verify-button {
                display: inline-block;
                padding: 12px 25px;
                font-size: 16px;
                color: #fff;
                background-color: #4CAF50;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 20px;
              }
              .verify-button:hover {
                background-color: #45a049;
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="email-header">
                <h1>Welcome, ${user.first_name}!</h1>
              </div>
              <div class="email-body">
                <p>Thank you for signing up. We are excited to have you on board!</p>
                <p>To complete your registration and verify your account, please click the button below:</p>
                <a href="${verifyLink}" class="verify-button">Verify Account</a>
                <p>If the button above doesn't work, you can copy and paste the following link into your browser:</p>
                <p style="word-wrap: break-word; color: #4CAF50;">${verifyLink}</p>
                <p>This link will expire in 10 minutes for your security.</p>
              </div>
              <div class="email-footer">
                <p>Need help? Contact our support team at support@example.com</p>
                <p>&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `;

        await sendEmail(user.email, subject, message);

        return res.status(400).json({
          errors: [
            {
              msg: "Your account is not verified. A new verification link has been sent to your email.",
            },
          ],
        });
      }

      const authToken = jwt.sign({ email: user.email }, jwtSecret);

      const formatDate = () => {
        return moment.tz("Asia/Karachi").format("HH:mm:ss YYYY/MM/DD");
      };

      user.login_at = formatDate();
      await user.save();

      res
        .status(200)
        .json({ message: "Logged in successfully", token: authToken });
    } catch (error) {
      console.error("Login Error: ", error);
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
);

// Route for login with google
router.post("/loginWithGoogle", verifyFirebaseToken, async (req, res) => {
  const { uid, name, email, picture } = req.user;
  
  const jwtSecret = process.env.JWT_SECRET_KEY;

  // Split name into first and second names
  const [first_name, second_name = ""] = name.split(" ");

  try {
    let user = await User.findOne({ googleId: uid });

    if (!user) {
      // Create a unique username
      const username = email.split("@")[0] + Math.floor(Math.random() * 1000);

      // Create a new user
      user = new User({
        googleId: uid,
        first_name,
        second_name,
        username,
        email,
        verifyStatus: "Verified",
        SignInWith: "Google Account",
        photoURL: picture,
        verified_at: moment.tz("Asia/Karachi").format("HH:mm:ss YYYY/MM/DD"),
        created_at: moment.tz("Asia/Karachi").format("HH:mm:ss YYYY/MM/DD"),
      });

      await user.save();

      const subject = "Thank You for Signing In with Google";
      const message = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
              }
              .email-container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                overflow: hidden;
              }
              .email-header {
                background-color: #4CAF50;
                color: #fff;
                padding: 20px;
                text-align: center;
              }
              .email-body {
                padding: 20px;
                line-height: 1.6;
              }
              .email-footer {
                background-color: #f1f1f1;
                text-align: center;
                padding: 10px;
                font-size: 12px;
                color: #888;
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="email-header">
                <h1>Welcome, ${user.first_name}!</h1>
              </div>
              <div class="email-body">
                <p>Thank you for signing in with Google. We're thrilled to have you as part of our community!</p>
                <p>To get started and explore your dashboard, login in to you account.</p>
              </div>
              <div class="email-footer">
                <p>Need help? Contact our support team at support@example.com</p>
                <p>&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
      `;

      await sendEmail(user.email, subject, message);

    }

    const authToken = jwt.sign({ email: user.email }, jwtSecret);

    // Update login timestamp
    user.login_at = moment.tz("Asia/Karachi").format("HH:mm:ss YYYY/MM/DD");
    await user.save();

  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Route for get user details: Require User Authentication
router.get("/details", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);

    const user = await User.findById(userId).select("-password");
    console.log(user);

    if (!user) {
      res.status(401).json({ msg: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;