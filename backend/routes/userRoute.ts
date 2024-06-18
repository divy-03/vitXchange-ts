import express from "express";
const router = express.Router();
const {
  registerUser,
  loginUser,
  logOutUser,
  getCookieToken,
  getUser,
} = require("../controllers/userController");
const { fetchUser } = require("../middleware/auth");

router.route("/auth/register").post(registerUser);
router.route("/auth/login").post(loginUser);
router.route("/auth/logout").get(fetchUser, logOutUser);
router.route("/auth/cookie").get(fetchUser, getCookieToken);
router.route("/auth/me").get(fetchUser, getUser);

module.exports = router;
