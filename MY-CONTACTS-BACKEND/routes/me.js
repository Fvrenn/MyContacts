const express = require("express");
const router = express.Router();
const User = require("../model/user.model");
const {verifyToken, decodeToken} = require("../middleware/authMiddleware");

router.get("/me", verifyToken, async (req, res) => {
  try {
    const myEmail = decodeToken(req.header("Authorization"));
    console.log(myEmail);
    const me = await User.findOne({ email: myEmail });
    console.log(me);
    res.status(200).json(me);
  } catch (error) {
    res.status(500).json({ error: error.message, code: "SERVER_ERROR" });
  }
});

module.exports = router;
