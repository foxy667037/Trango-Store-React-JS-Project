import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export async function sendEmail(to, subject, message) {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Correct host for Gmail
      port: 587,
      secure: false, // Set to true for port 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASSWORD, 
      },
    });

    // Mail options
    const mailOptions = {
      from: `"Trango Garments" <${process.env.EMAIL_USER}>`, // Sender's name and email
      to: to, // Recipient
      subject: subject, // Email subject
      html: message, // Email content as HTML
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
    return true
  } catch (error) {
    console.error("Failed to send email:", error.message);
    return false;
  }
}