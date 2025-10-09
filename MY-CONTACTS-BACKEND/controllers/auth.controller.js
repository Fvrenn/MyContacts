const authService = require('../services/auth.service');

exports.register = async (req, res) => {
  try {
    const result = await authService.register(req);
    res.status(result.status).json(result.body);
  } catch (error) {
    res.status(500).json({ error: error.message, code: "SERVER_ERROR" });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await authService.login(req);
    res.status(result.status).json(result.body);
  } catch (error) {
    res.status(500).json({ error: error.message, code: "SERVER_ERROR" });
  }
};