const express = require("express");
const {traininformation}=require("../controllers/findtrain")

const router=express.Router();

router.post('/',traininformation)


module.exports=router;