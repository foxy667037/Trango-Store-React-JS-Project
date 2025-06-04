import express from "express";
import { body, validationResult } from "express-validator";
import Banner from "../../models/Banner/Banner.js";
import fetchUser from "../../middleware/fetchUser.js";
import moment from "moment-timezone";

const router = express.Router();

// Validation middleware
const bannerValidation = [
  body("banner_title", "Title is required").notEmpty().trim(),
  body("banner_title", "Title must be between 3 and 100 characters").isLength({
    min: 3,
    max: 100,
  }),
  body("banner_description", "Description is required").notEmpty().trim(),
  body(
    "banner_description",
    "Description must be between 10 and 500 characters"
  ).isLength({ min: 5, max: 500 }),
  body("display_banner", "Display Banner must be a boolean value")
    .optional()
    .isBoolean(),
];

// POST route to add or update a banner
router.post(
  "/addORupdatebanner",
  fetchUser,
  bannerValidation,
  async (req, res) => {
    const { banner_title, banner_description, display_banner } = req.body;
    const userId = req.user.id;

    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation Errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedBanner = await Banner.findOneAndUpdate(
        { userId },
        {
          banner_title,
          banner_description,
          display_banner,
          updatedAt: moment.tz("Asia/Karachi").format("HH:mm:ss YYYY/MM/DD"),
        },
        { new: true, upsert: true } 
      );

      return res.status(200).json({
        message: "Banner saved successfully!",
        banner: updatedBanner,
      });
    } catch (error) {
      console.error("Error saving banner:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while saving the banner." });
    }
  }
);

router.get("/show", async (req, res) => {
  try {
    const banner = await Banner.findOne();

    if (!banner) {
      return res.status(404).json({ message: "No banner found" });
    }

    const response = {
      title: banner.banner_title,
      description: banner.banner_description,
      display: banner.display_banner ? "Yes" : "No",
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching banner:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;