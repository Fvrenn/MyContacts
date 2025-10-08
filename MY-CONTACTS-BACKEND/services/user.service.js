const User = require('../model/user.model');
const { decodeToken } = require('../middleware/authMiddleware');

exports.getMe = async (req) => {
  const myEmail = decodeToken(req.header("Authorization"));
  const me = await User.findOne({ email: myEmail });
  return me;
};