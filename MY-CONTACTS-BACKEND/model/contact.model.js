const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
 username: {
 type: String,
 required: true,
 },
 phonenumber: {
 type: Number,
 required: true,
 unique: true,
 },
 adresse: {
 type: String,
 required: false,
 },
 createdAt: {
 type: Date,
 default: Date.now,
 },
});
const Contact = mongoose.model('contact', contactSchema);
module.exports = Contact;