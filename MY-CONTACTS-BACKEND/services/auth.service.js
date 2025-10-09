const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

exports.register = async (req) => {
  const { email, username, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { status: 409, body: { error: "Cet email est déjà utilisé" } };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, email });
  await user.save();
  return { status: 201, body: { message: "Inscription réussie" } };
};

exports.login = async (req) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return { status: 401, body: { error: "Echec de l'authentification" } };
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return { status: 401, body: { error: "Echec de l'authentification" } };
  }
  const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  return { status: 200, body: { token } };
};