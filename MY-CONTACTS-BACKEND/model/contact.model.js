const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
 username: {
 type: String,
 required: true,
 },
 phonenumber: {
 type: String,
 required: true,
 unique: true,
 },
 adresse: {
 type: String,
 required: false,
 },
 ownerEmail: {
    type: String,
    require: true
 },
 createdAt: {
 type: Date,
 default: Date.now,
 },
});
const Contact = mongoose.model('contact', contactSchema);
module.exports = Contact;