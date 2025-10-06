const express = require("express");
const router = express.Router();
const Contact = require("../model/contact.model");
const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const { verifyToken, decodeToken, verifyAcces } = require("../middleware/authMiddleware");

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

// EDIT CONTACT
router.patch("/contact/:id", verifyToken, async (req, res) => {
  try {
    const contactID = req.params.id;
    const contact = await Contact.findById(contactID)
    if (verifyAcces(req.header("Authorization"), contact)) {
      const updates = req.body;
      const updatedContact = await Contact.findByIdAndUpdate(
        contactID,
        { $set: updates },
        { new: true }
      );
      res.status(200).json({ message: "Contact modifié avec succès", contact: updatedContact });
    } else {
      res.status(403).json({ message: "Accès refusé: vous n'êtes pas autorisé à modifier ce contact" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE CONTACT
router.delete("/contact/:id", verifyToken, async (req, res) => {
  try {
    const contactID = req.params.id;
    const contact = await Contact.findById(contactID);
    if (verifyAcces(req.header("Authorization"), contact)) {
      await Contact.findByIdAndDelete(contactID);
      res.status(200).json({ message: "Contact supprimé avec succès" });
    } else {
      res.status(403).json({ message: "Accès refusé: vous n'êtes pas autorisé à supprimer ce contact" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// GET CONTACT
router.get("/contact", verifyToken, async (req, res) => {
  try {
    const contacts = await Contact.find({ ownerEmail: req.email });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
