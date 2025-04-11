const bcryptjs= require("bcryptjs");

const { User }= require("../models/User");

const { generateTokenAndSetCookie } = require("../utils/generateTokenAndSetCookie");

const { sendVerificationEmail, sendWelcomeEmail } = require("../mailtrap/emails")

const signup = async (req,res)=>{

    const {email,password,name}=req.body;

    try{
        
        if(!email || !password || !name){
            throw new Error("All fields are required!!");
        }

        const userAlreadyExists = await User.findOne({email});

        if(userAlreadyExists){
            return res.status(400).json({success:false,message:"User already exists"});
        }


        const hashedPassword = await bcryptjs.hash(password,10);

        const verificationToken = Math.floor(100000 + Math.random()*900000).toString();

        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now()+ 24*60*60*1000
        })

        await user.save();

        //jwt use to authenticate the process 

        generateTokenAndSetCookie(res,user._id);

        await sendVerificationEmail(user.email, verificationToken);


        res.status(201).json({
            success:true,
            message:"user created successfully",
            user:{
                ...user._doc,
                password:undefined
            }
        })

    }

    catch (error){
        res.status(400).json({success:false,message:error.message});
    }
    res.send("signup route")
}

const verifyEmail = async(req,res)=>{

    const {code}=req.body;

    try{
        const user= await User.findOne({
         verificationToken: code,
         verificationTokenExpiresAt: {$gt:Date.now()}
      });

      if(!user){
        return res.status(400).json({success:false,message:"Invalid or expired verification code"});
      }

      user.isVerified=true;
      user.verificationToken=undefined;
      user.verificationTokenExpiresAt=undefined;

      await user.save();

      await sendWelcomeEmail(user.email,user.name);

      res.status(200).json({
        success:true,
        message:"Email verified successfully",
        user:{
            ...user._doc,
            password:undefined,
        }
      })

    }

    catch(error){
        console.log("error in verify email",error);
       res.status(500).json({success:false,message:"server error"});
    }
}

const login = async (req,res)=>{
    // res.send("login route")

    const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}
		const isPasswordValid = await bcryptjs.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

		generateTokenAndSetCookie(res, user._id);

		user.lastLogin = new Date();
		await user.save();

		res.status(200).json({
			success: true,
			message: "Logged in successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log("Error in login ", error);
		res.status(400).json({ success: false, message: error.message });
	}
}


const logout = async (req,res)=>{
    res.send("logout route");

    res.clearCookie("token");
    res.status(200).json({success:true,message:"logged out successfully"})
}


module.exports={
    signup,
    login,
    logout,
    verifyEmail
};