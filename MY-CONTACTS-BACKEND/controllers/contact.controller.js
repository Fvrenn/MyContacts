const contactService = require('../services/contact.service');

exports.addContact = async (req, res) => {
  try {
    const result = await contactService.addContact(req);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message, code: "SERVER_ERROR" });
  }
};

exports.editContact = async (req, res) => {
  try {
    const result = await contactService.editContact(req);
    res.status(result.status).json(result.body);
  } catch (error) {
    res.status(500).json({ error: error.message, code: "SERVER_ERROR" });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const result = await contactService.deleteContact(req);
    res.status(result.status).json(result.body);
  } catch (error) {
    res.status(500).json({ error: error.message, code: "SERVER_ERROR" });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const result = await contactService.getContacts(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message, code: "SERVER_ERROR" });
  }
};

exports.getContactById = async (req, res) => {
  try {
    const result = await contactService.getContactById(req);
    res.status(result.status).json(result.body);
  } catch (error) {
    res.status(500).json({ error: error.message, code: "SERVER_ERROR" });
  }
};

