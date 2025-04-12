const express = require("express");
const { traininformation } = require("../controllers/findtrain");

const router = express.Router();

// // Train search endpoint
// router.post('/', traininformation);

// router.get("/signup", (req, res) => {
//     res.send("Signup Route");
// });

// router.get("/login", (req, res) => {
//     res.send("login Route");
// });


// router.get("/logout", (req, res) => {
//     res.send("logout Route");
// });


module.exports = router;