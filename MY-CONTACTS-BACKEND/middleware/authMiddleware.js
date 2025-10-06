const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Accès refuser" });
  try {
    const decoded = jwt.verify(token, "clef-secrete");
    req.email = decoded.email;
    next();
  } catch (error) {
    res.status(401).json({ error: "token invalide" });
  }
}

function decodeToken(encryptedTooken) {
  const token = encryptedTooken.replace("Bearer ", "");
  console.log(token);
  const decoded = jwt.verify(token, "clef-secrete");
  console.log(decoded);
  return decoded.email;
}

module.exports = { verifyToken, decodeToken };
