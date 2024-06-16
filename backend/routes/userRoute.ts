import express from "express";
const router = express.Router();
const { registerUser } = require("../controllers/userController");

router.route("/auth/register").post(registerUser);

module.exports = router;
