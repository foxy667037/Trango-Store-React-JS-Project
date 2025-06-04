import express from "express";
import dotenv from "dotenv";
import Order from "../models/OrderForm.js";
import { sendEmail } from '../utility/emailService.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();
dotenv.config();

router.post("/submit",
  [
    body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Email must be valid'),
  body('phone').isMobilePhone().withMessage('Phone must be valid'),
  body('address').notEmpty().withMessage('Address is required'),
  body('country').notEmpty().withMessage('Country is required'),
  body('cartItems').isArray().withMessage('Cart items must be an array').notEmpty().withMessage('At least one product is required'),
  body('orderTotal').isNumeric().withMessage('Order total must be a number').notEmpty().withMessage('Order total is required'),
  body('shippingOption').notEmpty().withMessage('Shipping option is required'),
  ], 
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

  function generateUniqueId() {
    const timestamp = Date.now().toString();
    const randomDigits = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");
    return (timestamp + randomDigits).slice(-10);
  }

  const orderId = generateUniqueId();

  try {
    const {
      name,
      email,
      phone,
      address,
      country,
      cartItems,
      orderTotal,
      shippingOption,
      paymentMethod,
    } = req.body;

    const newOrder = new Order({
      orderId,
      name,
      email,
      phone,
      address,
      country,
      cartItems,
      orderTotal,
      shippingOption,
      paymentMethod,
    });

    await newOrder.save();

    // Admin Email
    const subjectAdmin = `New Order From ${email}`;
    const messageAdmin = `
  <div style="background-color: #f9fafb; padding: 20px; font-family: Arial, sans-serif; color: #333;">
    <div style="max-width: 700px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border-radius: 10px; overflow: hidden;">
      <div style="background-color: #4f46e5; padding: 20px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 24px; font-weight: bold;">New Order Received</h1>
      </div>
      <div style="padding: 20px;">
        <p style="font-size: 16px; line-height: 1.5; margin: 0;">
          A new order has been placed. Below are the details:
        </p>

        <div style="background-color: #f3f4f6; border: 1px solid #d1d5db; border-radius: 8px; padding: 15px; margin: 20px 0;">
          <p style="margin: 0; font-size: 18px; font-weight: bold; color: #4f46e5;">Order ID:</p>
          <p style="margin: 5px 0 0; font-size: 16px; font-family: 'Courier New', Courier, monospace; color: #1f2937;">${orderId}</p>
        </div>

        <h2 style="font-size: 20px; margin: 20px 0 10px; color: #4f46e5; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px;">Customer Details</h2>
        <ul style="font-size: 16px; line-height: 1.5; padding: 0; list-style: none; margin: 0;">
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Address:</strong> ${address}</li>
          <li><strong>Country:</strong> ${country}</li>
        </ul>

        <h2 style="font-size: 20px; margin: 20px 0 10px; color: #4f46e5; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px;">Order Summary</h2>
        <ul style="font-size: 16px; line-height: 1.5; padding: 0; list-style: none; margin: 0;">
          <li><strong>Shipping Option:</strong> ${shippingOption}</li>
          <li><strong>Payment Method:</strong> ${paymentMethod}</li>
          <li><strong>Order Total:</strong> ${orderTotal} RS</li>
        </ul>

        <h2 style="font-size: 20px; margin: 20px 0 10px; color: #4f46e5; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px;">Products</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr style="background-color: #f3f4f6;">
              <th style="border: 1px solid #d1d5db; padding: 10px; text-align: left; font-size: 16px; color: #4b5563;">Product</th>
              <th style="border: 1px solid #d1d5db; padding: 10px; text-align: left; font-size: 16px; color: #4b5563;">Quantity</th>
              <th style="border: 1px solid #d1d5db; padding: 10px; text-align: left; font-size: 16px; color: #4b5563;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${cartItems
              .map(
                (item) => `
              <tr>
                <td style="border: 1px solid #d1d5db; padding: 10px; font-size: 16px; color: #1f2937;">${item.name}</td>
                <td style="border: 1px solid #d1d5db; padding: 10px; font-size: 16px; color: #1f2937;">${item.quantity}</td>
                <td style="border: 1px solid #d1d5db; padding: 10px; font-size: 16px; color: #1f2937;">${item.total} RS</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>

        <p style="font-size: 14px; color: #6b7280; margin-top: 20px; text-align: center;">
          Thank you for choosing our store. Please process the order promptly.
        </p>
      </div>
    </div>
  </div>
    `;

    const subjectUser = "Thank You For Your Order!";
    const messageUser = `
  <div style="background-color: #f9fafb; padding: 20px; font-family: Arial, sans-serif; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border-radius: 10px; overflow: hidden;">
      <div style="background-color: #4f46e5; padding: 20px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 24px; font-weight: bold;">Thank You for Your Order!</h1>
      </div>
      <div style="padding: 20px;">
        <p style="font-size: 16px; line-height: 1.5; margin: 0;">
          Dear <strong>${name}</strong>, thank you for shopping with us! We have received your order, and our team will review and confirm it shortly.
        </p>

        <!-- Order ID -->
        <div style="background-color: #f3f4f6; border: 1px solid #d1d5db; border-radius: 8px; padding: 15px; margin: 20px 0;">
          <p style="margin: 0; font-size: 18px; font-weight: bold; color: #4f46e5;">Order ID:</p>
          <p style="margin: 5px 0 0; font-size: 16px; font-family: 'Courier New', Courier, monospace; color: #1f2937;">${orderId}</p>
          <p style="margin-top: 10px; font-size: 18px; font-weight: bold; color: #4f46e5;">Paymend Method:</p>
          <p style="margin: 5px 0 0; font-size: 16px; font-family: 'Courier New', Courier, monospace; color: #1f2937;">${paymentMethod}</p>
          <p style="margin: 10px 0 0; font-size: 14px; color: #6b7280;">
            Please keep this order ID for your reference. It will help us assist you better if you have any queries.
          </p>
        </div>

        <!-- Order Summary -->
        <div style="background-color: #f3f4f6; border: 1px solid #d1d5db; border-radius: 8px; padding: 15px; margin: 20px 0;">
          <p style="margin: 0; font-size: 18px; font-weight: bold; color: #4f46e5;">Order Summary:</p>
          <table style="width: 100%; margin-top: 10px; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #e5e7eb;">
                <th style="padding: 8px; border: 1px solid #d1d5db; text-align: left;">Item</th>
                <th style="padding: 8px; border: 1px solid #d1d5db; text-align: right;">Quantity</th>
                <th style="padding: 8px; border: 1px solid #d1d5db; text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${cartItems
                .map(
                  (item) => `
                <tr>
                  <td style="padding: 8px; border: 1px solid #d1d5db;">${item.name}</td>
                  <td style="padding: 8px; border: 1px solid #d1d5db; text-align: right;">${item.quantity}</td>
                  <td style="padding: 8px; border: 1px solid #d1d5db; text-align: right;">${item.total.toFixed(
                    2
                  )} RS</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
            <tfoot>
              <tr style="background-color: #e5e7eb; font-weight: bold;">
                <td style="padding: 8px; border: 1px solid #d1d5db;" colspan="2">Total Price:</td>
                <td style="padding: 8px; border: 1px solid #d1d5db; text-align: right;">${orderTotal.toFixed(2)} RS</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <p style="font-size: 16px; line-height: 1.5; margin: 0;">
          If you have any questions or need assistance, feel free to reach out to our support team.
        </p>
        <p style="font-size: 16px; line-height: 1.5; margin: 20px 0 0;">Thank you for choosing us!</p>

        <div style="text-align: center; margin-top: 30px;">
          <a
            href="https://trango.vercel.app"
            style="background-color: #4f46e5; color: #ffffff; padding: 12px 25px; border-radius: 8px; text-decoration: none; font-size: 16px; font-weight: bold; display: inline-block; transition: background-color 0.3s ease;"
            onmouseover="this.style.backgroundColor='#3730a3';"
            onmouseout="this.style.backgroundColor='#4f46e5';"
          >
            Visit Our Store
          </a>
        </div>

        <p style="font-size: 12px; color: #9ca3af; text-align: center; margin-top: 30px;">
          This is an automated email. Please do not reply.
        </p>
      </div>
    </div>
  </div>
    `;

    // Sending Emails
    await Promise.all([
      sendEmail(process.env.EMAIL_USER, subjectAdmin, messageAdmin),
      sendEmail(email, subjectUser, messageUser),
    ]);

    res.status(200).json({
      message: "Order placed successfully and emails sent",
      orderId,
    });
    
  } catch (error) {
    console.error("Error handling order:", error);
    res.status(500).json({ message: "Error placing order", error });
  }
});

export default router;