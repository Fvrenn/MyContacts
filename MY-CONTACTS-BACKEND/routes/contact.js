const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const contactController = require("../controllers/contact.controller");

router.post("/contact", verifyToken, contactController.addContact);
router.patch("/contact/:id", verifyToken, contactController.editContact);
router.delete("/contact/:id", verifyToken, contactController.deleteContact);
router.get("/contact", verifyToken, contactController.getContacts);
router.get("/contact/:id", verifyToken, contactController.getContactById);

module.exports = router;
