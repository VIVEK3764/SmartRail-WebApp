const express = require("express");
const {traininformation}=require("../controllers/findtrain");

const { signup } = require("../controllers/auth");
const { login } = require("../controllers/auth");
const { logout } = require("../controllers/auth");
const { verifyEmail } = require("../controllers/auth");
const { forgotPassword } = require("../controllers/auth");
const { resetPassword } = require("../controllers/auth");

const { verifyToken } = require("../middleware/verifyToken");

const { checkAuth } = require("../controllers/auth")

const router=express.Router();

// router.post('/',traininformation)

router.get("/check-auth",verifyToken,checkAuth);

router.post("/signup", signup);

router.post("/login",login);

router.post("/logout",logout);

router.post("/forgot-password",forgotPassword);

router.post("/reset-password/:token",resetPassword);


router.post("/verify-email",verifyEmail)


module.exports=router;