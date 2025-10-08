const Contact = require('../model/contact.model');
const { decodeToken, verifyAcces } = require('../middleware/authMiddleware');

exports.addContact = async (req) => {
  const { username, phonenumber, adresse } = req.body;
  const ownerEmail = decodeToken(req.header("Authorization"));
  const contact = new Contact({ username, phonenumber, adresse, ownerEmail });
  await contact.save();
  return { message: "Contact ajoutée" };
};

exports.editContact = async (req) => {
  const contactID = req.params.id;
  const contact = await Contact.findById(contactID);
  if (verifyAcces(req.header("Authorization"), contact)) {
    const updates = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(
      contactID,
      { $set: updates },
      { new: true }
    );
    return { status: 200, body: { message: "Contact modifié avec succès", contact: updatedContact } };
  } else {
    return { status: 403, body: { message: "Accès refusé: vous n'êtes pas autorisé à modifier ce contact" } };
  }
};

exports.deleteContact = async (req) => {
  const contactID = req.params.id;
  const contact = await Contact.findById(contactID);
  if (verifyAcces(req.header("Authorization"), contact)) {
    await Contact.findByIdAndDelete(contactID);
    return { status: 200, body: { message: "Contact supprimé avec succès" } };
  } else {
    return { status: 403, body: { message: "Accès refusé: vous n'êtes pas autorisé à supprimer ce contact" } };
  }
};

exports.getContacts = async (req) => {
  const ownerEmail = decodeToken(req.header("Authorization"));
  const contacts = await Contact.find({ ownerEmail });
  return contacts;
};

exports.getContactById = async (req) => {
  const contactID = req.params.id;
  const contact = await Contact.findById(contactID);
  if (verifyAcces(req.header("Authorization"), contact)) {
    return { status: 200, body: contact };
  } else {
    return { status: 403, body: { message: "Accès refusé: vous n'êtes pas autorisé à voir ce contact" } };
  }
};
