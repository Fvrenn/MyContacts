const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
  const token = req.header("Authorisation");
  if (!token) return res.status(401).json({ error: "Accès refuser" });
  try {
    const decoded = jwt.verify(token, "clef-secrete");
    req.user._id = decoded.userID;
    next();
  } catch (error) {
    res.status(401).json({ error: "token invalide" });
  }
}

module.exports = verifyToken;