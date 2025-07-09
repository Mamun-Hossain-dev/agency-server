const express = require("express");
const Contact = require("../models/Contact");
const {
  authenticateToken,
  requireAdmin,
} = require("../middleware/authMiddleware");

const router = express.Router();

// POST /api/contact - Submit contact form
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, subject, message, serviceType } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    const contact = new Contact({
      name,
      email,
      phone,
      subject,
      message,
      serviceType,
    });

    await contact.save();

    res
      .status(201)
      .json({
        message: "Your message has been received. We'll be in touch soon!",
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to submit contact form", error: error.message });
  }
});

// GET /api/contact - Get all contact submissions (admin only)
router.get("/", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to fetch contact submissions",
        error: error.message,
      });
  }
});

module.exports = router;
