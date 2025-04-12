const express = require("express");
const { traininformation } = require("../controllers/findtrain");

const { signup } = require("../controllers/auth");
const { login } = require("../controllers/auth");
const { logout } = require("../controllers/auth");
const { verifyEmail } = require("../controllers/auth");
const { forgotPassword } = require("../controllers/auth");
const { resetPassword } = require("../controllers/auth");

const { verifyToken } = require("../middleware/verifyToken");

const { checkAuth } = require("../controllers/auth")
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

// router.post('/',traininformation)

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);


router.post("/verify-email", verifyEmail)

router.get("/verify", (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ verified: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        // Attempt to decode the token
        const decoded = jwt.verify(token, JWT_SECRET);

        // If the token is valid, send a response
        res.json({ verified: true, user: decoded });
    } catch (err) {
        // In case of an error (invalid or expired token), return the error
        res.status(401).json({ verified: false, message: "Invalid or expired token" });
    }
});
module.exports = router;