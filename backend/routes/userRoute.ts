import express from "express";
const router = express.Router();
const {
  registerUser,
  loginUser,
  logOutUser,
  getCookieToken,
} = require("../controllers/userController");

router.route("/auth/register").post(registerUser);
router.route("/auth/login").post(loginUser);
router.route("/auth/logout").get(logOutUser);
router.route("/auth/cookie").get(getCookieToken);

module.exports = router;
