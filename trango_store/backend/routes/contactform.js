import express from "express";
import ContactForm from "../models/ContactForm.js";
import { sendEmail } from "../utility/emailService.js";
import { body, validationResult } from "express-validator";
import dotenv from "dotenv";

const router = express.Router();

dotenv.config();

// Router 1: Use to Submit a Contact Form
router.post(
  "/submit",
  [
    body("subject").notEmpty().withMessage("Subject is required"),
    body("order_number")
      .optional()
      .isAlphanumeric()
      .withMessage("Order number must be alphanumeric"),
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("number")
      .isMobilePhone()
      .withMessage("Valid phone number is required"),
    body("description")
      .notEmpty()
      .withMessage("Description is required")
      .isLength({ min: 10 })
      .withMessage("Description must be at least 10 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { subject, order_number, name, email, number, description } =
      req.body;

    try {
      // Save data in the database
      const contact_form = await ContactForm.create({
        subject: subject,
        order_number: order_number,
        name: name,
        email: email,
        number: number,
        description: description,
      });

      if (contact_form) {
        // Send to Admin
        const subjectAdmin = subject;
        const messageAdmin = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f7f7f7;
      color: #333;
    }
    .email-container {
      max-width: 650px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .email-header {
      background-color: #0066cc;
      color: #ffffff;
      text-align: center;
      padding: 40px;
      font-size: 26px;
      font-weight: bold;
      letter-spacing: 1px;
    }
    .email-body {
      padding: 40px;
      line-height: 1.6;
      color: #555;
    }
    .email-footer {
      background-color: #f9f9f9;
      text-align: center;
      padding: 20px;
      font-size: 14px;
      color: #888;
    }
    .form-data {
      margin-top: 30px;
      padding: 20px;
      background-color: #f8f8f8;
      border-left: 4px solid #0066cc;
      border-radius: 5px;
      box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
    }
    .form-data p {
      margin: 12px 0;
      font-size: 16px;
    }
    .form-data span {
      font-weight: 600;
      color: #333;
    }
    .cta {
      text-align: center;
      margin-top: 30px;
    }
    .cta a {
      padding: 10px 20px;
      background-color: #0066cc;
      color: #ffffff;
      font-weight: bold;
      text-decoration: none;
      border-radius: 5px;
      transition: background-color 0.3s ease;
    }
    .cta a:hover {
      background-color: #004a99;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      New Contact Form Submission
    </div>
    <div class="email-body">
      <p>Hello,</p>
      <p>You have received a new contact form submission from <span>${name}</span>.</p>
      <p>Please review the details below:</p>
      
      <div class="form-data">
        <p><span>Subject:</span> ${subject}</p>
        <p><span>Order Number:</span> ${order_number || "N/A"}</p>
        <p><span>Name:</span> ${name}</p>
        <p><span>Email:</span> ${email}</p>
        <p><span>Phone Number:</span> ${number}</p>
        <p><span>Description:</span> ${description}</p>
      </div>

      <p>Make sure to follow up with the user based on the details above.</p>

      <div class="cta">
        <a href="mailto:${email}">Reply to ${name}</a>
      </div>
    </div>
    <div class="email-footer">
      <p>If you need assistance, feel free to contact our support team at <a href="mailto:support@example.com">support@example.com</a></p>
      <p>&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
      `;

        const emailSent = await sendEmail(
          process.env.EMAIL_USER, // Admin email
          subjectAdmin,
          messageAdmin
        );

        // Send email to User
        const subjectUser = "Thank You For Form Submission";
        const messageUser = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f8f8f8;
      color: #333;
    }
    .email-container {
      max-width: 650px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .email-header {
      background-color: #0066cc;
      color: #ffffff;
      text-align: center;
      padding: 40px;
      font-size: 26px;
      font-weight: bold;
      letter-spacing: 1px;
    }
    .email-body {
      padding: 40px;
      line-height: 1.6;
      color: #555;
    }
    .email-footer {
      background-color: #f9f9f9;
      text-align: center;
      padding: 20px;
      font-size: 14px;
      color: #888;
    }
    .cta {
      text-align: center;
      margin-top: 30px;
    }
    .cta a {
      padding: 12px 25px;
      background-color: #0066cc;
      color: #ffffff;
      font-weight: bold;
      text-decoration: none;
      border-radius: 5px;
      transition: background-color 0.3s ease;
      font-size: 16px;
    }
    .cta a:hover {
      background-color: #004a99;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      Thank You for Your Submission!
    </div>
    <div class="email-body">
      <p>Hello,</p>
      <p>Thank you for your contact form submission! We appreciate the time you've taken to reach out to us.</p>
      <p>Our team will review your message and get back to you as soon as possible. In the meantime, feel free to browse our website or reach out if you have any urgent questions.</p>
      
      <div class="cta">
        <a href="mailto:support@example.com">Contact Support</a>
      </div>

      <p>If you have any urgent inquiries, don't hesitate to contact us directly at <a href="mailto:support@example.com">support@example.com</a>.</p>
    </div>
    <div class="email-footer">
      <p>&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
      `;

        const sentUserEmail = await sendEmail(email, subjectUser, messageUser);

        if (emailSent && sentUserEmail) {
          return res
            .status(200)
            .json({ message: "Form submitted and emails sent successfully" });
        } else {
          return res.status(500).json({ message: "Failed to send emails" });
        }
      } else {
        return res.status(500).json({ message: "Failed to save form data" });
      }
    } catch (error) {
      console.error("Error occurred:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export default router;