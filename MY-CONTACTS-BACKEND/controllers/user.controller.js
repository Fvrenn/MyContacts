const userService = require('../services/user.service');

exports.getMe = async (req, res) => {
  try {
    const result = await userService.getMe(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message, code: "SERVER_ERROR" });
  }
};