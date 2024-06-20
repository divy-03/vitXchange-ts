import express from "express";
const router = express.Router();
const {
  registerUser,
  loginUser,
  logOutUser,
  getCookieToken,
  getUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");
const { fetchUser } = require("../middleware/auth");

router.route("/auth/register").post(registerUser);
router.route("/auth/login").post(loginUser);
router.route("/auth/logout").get(fetchUser, logOutUser);
router.route("/auth/cookie").get(fetchUser, getCookieToken);
router.route("/auth/me").get(fetchUser, getUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

module.exports = router;
