const express = require("express");
const {traininformation}=require("../controllers/findtrain");

const { signup } = require("../controllers/auth");
const { login } = require("../controllers/auth");
const { logout } = require("../controllers/auth");
const { verifyEmail } = require("../controllers/auth");

const router=express.Router();

// router.post('/',traininformation)

router.post("/signup", signup);

router.post("/login",login);

router.post("/logout",logout);


router.post("/verify-email",verifyEmail)


module.exports=router;