const express = require("express");
const router = express.Router();
const Contact = require("../model/contact.model");
const jwt = require("jsonwebtoken");
const { verifyToken, decodeToken } = require("../middleware/authMiddleware");

// ADD CONTACT
router.post("/contact", verifyToken, async (req, res) => {
  try {
    const { username, phonenumber, adresse } = req.body;
    const ownerEmail = decodeToken(req.header("Authorization"));
    const contact = new Contact({ username, phonenumber, adresse, ownerEmail });
    await contact.save();
    res.status(201).json({ message: "Contact ajoutée" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET CONTACT
router.get("/contact", verifyToken, async (req, res) => {
  try {
    const contacts = await Contact.find({ ownerEmail: req.emailId });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
