const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
    unique: true,
    minlength: [10, "Le numéro de téléphone doit contenir au moins 10 caractères"],
    maxlength: [20, "Le numéro de téléphone ne peut pas dépasser 20 caractères"],
  },
  adresse: {
    type: String,
    required: false,
  },
  ownerEmail: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Contact = mongoose.model("contact", contactSchema);
module.exports = Contact;
