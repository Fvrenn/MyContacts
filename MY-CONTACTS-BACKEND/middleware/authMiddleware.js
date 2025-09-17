const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Accès refuser" });
  try {
    const decoded = jwt.verify(token, "clef-secrete");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "token invalide" });
  }
}

module.exports = verifyToken;