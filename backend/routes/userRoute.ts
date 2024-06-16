import express from "express";
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");

router.route("/auth/register").post(registerUser);
router.route("/auth/login").post(loginUser);

module.exports = router;
