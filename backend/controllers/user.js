const User= require('../models/user')

async function handleUserSignup(req,res){
    const {name,email,password}=req.body;

    const new_user=await User.create({
        name,email,password
    });

    console.log("user created",new_user)

    return res.json("home")
}


module.exports={
    handleUserSignup
}