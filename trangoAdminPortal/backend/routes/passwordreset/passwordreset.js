import express from "express";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { sendEmail } from "../../utility/emailService.js";
import User from "../../models/User/User.js";
import fetchCode from "../../middleware/fetchCode.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Forgot Password Route
router.post(
  "/forgot-password",
  [body("email", "Enter a valid email address").notEmpty().isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          errors: [{ msg: "No user found with this email address" }],
        });
      }

      const code = Math.floor(100000 + Math.random() * 900000); // 6-digit verification code

      const jwtSecret = process.env.JWT_SECRET_KEY;
      const token = jwt.sign({ email, code }, jwtSecret, { expiresIn: "10m" });

      const subject = "Your Password Reset Code";
      const message = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 8px;
            overflow: hidden;
          }
          .email-header {
            background-color: #007bff;
            color: #ffffff;
            padding: 20px;
            text-align: center;
          }
          .email-header h1 {
            margin: 0;
            font-size: 24px;
          }
          .email-body {
            padding: 20px;
            line-height: 1.6;
            color: #333333;
          }
          .email-body p {
            margin: 10px 0;
            font-size: 16px;
          }
          .code-box {
            font-size: 14px;
            font-weight: bold;
            color: #007bff;
            text-align: center;
            background-color: #f1f1f1;
            padding: 10px;
            margin: 20px 0;
            border-radius: 8px;
          }
          .email-footer {
            text-align: center;
            background: #f1f1f1;
            padding: 10px;
            font-size: 14px;
            color: #666666;
          }
          .email-footer a {
            color: #007bff;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <!-- Email Header -->
          <div class="email-header">
            <h1>Password Reset Request</h1>
          </div>
  
          <!-- Email Body -->
          <div class="email-body">
            <p>Hello,</p>
            <p>We received a request to reset your password. Please use the verification code below to proceed:</p>
            <div class="code-box">${code}</div>
            <p>This code will expire in <strong>10 minutes</strong>. If you didn't request a password reset, you can safely ignore this email.</p>
            <p>Thank you,<br>The Support Team</p>
          </div>
  
          <!-- Email Footer -->
          <div class="email-footer">
            <p>If you have any questions, feel free to <a href="mailto:support@example.com">contact our support team</a>.</p>
          </div>
        </div>
      </body>
      </html>
      `;

      await sendEmail(email, subject, message);

      res.json({
        message: "Verification code sent to email",
        token: token,
        code: code,
      });
    } catch (error) {
      console.error("Error in forgot-password route:", error);
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
);

// Verify Code Route
router.post(
  "/verify-code",
  [body("code", "Code is required").notEmpty()],
  fetchCode,
  async (req, res) => {
    const { code } = req.body;

    try {
      if (req.code !== parseInt(code)) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid or expired code!" }] });
      }

      res.json({
        message: "Code verified successfully. Proceed to reset password.",
      });
    } catch (error) {
      console.error("Error in verify-code route:", error);
      res.status(400).json({ errors: [{ msg: "Invalid or expired token" }] });
    }
  }
);

// Reset Password Route
router.post(
  "/reset-password",
  [
    body("newPassword", "Password must be at least 6 characters long")
      .notEmpty()
      .isLength({ min: 6 }),
  ],
  fetchCode,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { newPassword } = req.body;

    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      req.user.password = hashedPassword;
      await req.user.save();

      res.json({ message: "Password reset successfully" });

      const subject = "Password Reset Successfully";
      const message = `
            <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Changed Successfully</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 8px;
            overflow: hidden;
          }
          .email-header {
            background-color: #28a745;
            color: #ffffff;
            padding: 20px;
            text-align: center;
          }
          .email-header h1 {
            margin: 0;
            font-size: 24px;
          }
          .email-body {
            padding: 20px;
            line-height: 1.6;
            color: #333333;
          }
          .email-body p {
            margin: 10px 0;
            font-size: 16px;
          }
          .email-footer {
            text-align: center;
            background: #f1f1f1;
            padding: 10px;
            font-size: 14px;
            color: #666666;
          }
          .email-footer a {
            color: #007bff;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <!-- Email Header -->
          <div class="email-header">
            <h1>Password Changed Successfully</h1>
          </div>
          
          <!-- Email Body -->
          <div class="email-body">
            <p>Hello,</p>
            <p>We wanted to let you know that your password has been successfully changed. If you did not make this change, please contact our support team immediately.</p>
            <p>If you have any questions or need further assistance, feel free to reach out to us.</p>
            <p>Thank you,<br>The Support Team</p>
          </div>
          
          <!-- Email Footer -->
          <div class="email-footer">
            <p>If you have any concerns, please <a href="mailto:support@example.com">contact our support team</a>.</p>
          </div>
        </div>
      </body>
      </html>
      `;

      await sendEmail(req.user.email, subject, message);
    } catch (error) {
      console.error("Error in reset-password route:", error);
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
);

export default router;