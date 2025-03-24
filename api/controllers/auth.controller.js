import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    next(err);
  }
};

//sign in controller

export const signin = async (req,res,next) =>{
  const {email,password} = req.body;
  try{
    const validUser = await User.findOne({email});
    if(!validUser){
      return next(errorHandler(404, 'User not found!'));
    }
    const validPassword = bcrypt.compareSync(password,validUser.password);

    if(!validPassword) return next(errorHandler(401,'Invalid Email or Password!'));
    
    const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET);
    const {password: pass,...rest} = validUser._doc;
    res.cookie('access_token',token,{httpOnly:true})
    .status(200)
    .json(rest)
    

  }catch(error){
    next(error);
  }
};


// google controller

export const google = async (req, res, next) => {
  try {
   

    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

      user = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });

      await user.save();
     
    } else {
      console.log("User already exists:", user);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = user._doc;

    

    return res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);

  } catch (error) {
    console.error("Error in Google Auth:", error);
    next(error);
  }
};