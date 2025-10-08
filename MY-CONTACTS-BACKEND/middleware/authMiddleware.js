const jwt = require("jsonwebtoken");
const Contact = require("../model/contact.model");
const dotenv = require("dotenv");

function verifyToken(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Accès refuser" });
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.email = decoded.email;
    next();
  } catch (error) {
    res.status(401).json({ error: "token invalide" });
  }
}

function decodeToken(encryptedTooken) {
  const token = encryptedTooken.replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  return decoded.email;
}

function verifyAcces(encryptedTooken, contact) {
  const email = decodeToken(encryptedTooken);
  if (email == contact.ownerEmail) {
    return true;
  }else{
    return false;
  }
}

module.exports = { verifyToken, decodeToken, verifyAcces };
