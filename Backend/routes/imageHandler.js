const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const cloudinary = require("../utils/cloudinaryConfig");

router.post("/", upload.single("image"), async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      imageUrl: req.file.path, // Cloudinary URL
    });
    console.log("Image uploaded successfully to Cloudinary");
  } catch (error) {
    res.status(500).json({ success: false, message: "Upload failed", error });
  }
});

module.exports = router;
