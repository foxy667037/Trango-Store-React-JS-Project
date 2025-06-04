import express from "express";
import Banner from "../models/Banner.js"; 

const router = express.Router();

// Route to fetch banner details without filtering by userId
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