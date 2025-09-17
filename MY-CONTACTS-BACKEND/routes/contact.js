const express = require("express");
const router = express.Router();
const Contact = require("../model/contact.model");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/authMiddleware");
// REGISTER
router.post("/contact", verifyToken, async (req, res) => {
  try {
    const { username, phonenumber, adresse } = req.body;
    const contact = new Contact({ username, phonenumber, adresse });
    await contact.save();
    res.status(201).json({ message: "Contact ajoutée" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;
