import bcrypt from "bcrypt";
import { UserSchema } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const signup = async (req, res) => {
  try {
    const hashpassword = await bcrypt.hash(req.body.userpassword, 10);
    const newuser = new UserSchema({ ...req.body, userpassword: hashpassword });
    const saveddata = await newuser.save();
    if (saveddata) res.status(200).json({ success: true, data: saveddata });
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};

const login = async (req, res) => {
  try {
    const isUserExist = await UserSchema.findOne({
      useremail: req.body.useremail,
    });
    if (isUserExist) {
      const passwordcorrect = bcrypt.compare(
        req.body.userpassword,
        isUserExist.userpassword
      );
      if (passwordcorrect) {
        const accesstoken = jwt.sign(
          { userid: isUserExist._id },
          process.env.JWTSECRET,
          { expiresIn: "1h" }
        );
        const refreshtoken = jwt.sign(
          { userid: isUserExist._id },
          process.env.JWTSECRET,
          {expiresIn:"1d"}
        );
        if (accesstoken && refreshtoken)
          res
            .status(200)
            .json({
              success: true,
              data: "User Created successfully",
              accesstoken: accesstoken,
              refreshtoken: refreshtoken,
            });
      } else res.status(201).json({ succes: false, data: "Invalid Password" });
    } else
      res.status(201).json({ success: false, data: "User Email is not Exist" });
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};

const verifyjwt = async (req, res) => {
    try
    {
  const token = req.headers.authorization.split(" ")[1];
  if (!token)
    res.status(200).json({ success: false, data: "Token is Missing" });
  else {
    const verifiedtoken = jwt.verify(token, process.env.JWTSECRET);
    if (verifiedtoken)
      res.status(200).json({ success: true, data: verifiedtoken });
    else res.status(404).json({ succes: false, data: "Token is Expired" });
  }
}
catch(e)
{
    res.status(500).json({success:false,data:e.message})
}
};


const refreshtoken=async(req,res)=>{
    try
    {
    const refreshtoken=req.headers.authorization.split(" ")[1]
    if(refreshtoken)
    {
        const data=jwt.verify(refreshtoken,process.env.JWTSECRET)
        const accesstoken=jwt.sign(data,process.env.JWTSECRET,{expiresIn:"1h"})
        const newrefeshtoken=jwt.sign(data,process.env.JWTSECRET,{expiresIn:"1d"})
        if(accesstoken)
        res.status(200).json({success:true,data:"Token Refreshed",accesstoken:accesstoken,refreshtoken:newrefeshtoken})
    }
}
catch(e)
{
    res.status(500).json({success:false,data:e.message})
}
}

export { signup, login, verifyjwt,refreshtoken };
