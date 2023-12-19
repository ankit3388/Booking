

import Admin from "../Model/AdminModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotevn from "dotenv"

export const AddAdmin= async (req,res,next) =>{
    const {Email,Password}=req.body;

    // console.log(Email);
    // console.log(Password);
    if(!Email && Email.trim()==="" &&  !Password && Password.trim()==="")
    {
        // respons for 420 to invalid data
        return res.status(420).json(
            {
                message:"Invalid inputs"
            }
        )
    }



//    return res.status(201).json({Email});
    // console.log(Password);

    let existingUser;
    try{
        console.log("Finding data")
        existingUser= await Admin.findOne({Email})
    }catch(err){
        return console.log(err);
    }

    if(existingUser)
    {
        return res.status(400).json({
            message:"Admin Already exits"
        })
    }
    let user;
    let CryptPassword=bcrypt.hashSync(Password);

    try{
        user=new Admin({Email,Password:CryptPassword});
        user=await user.save();

    } catch(err){
        return console.log(err);
    }

    if(!user)
    {
        return res.status(500).json({
            message:"Try agin Not added Admin"
         })
    }
    return res.status(201).json({user});
}


export const AdminLogin=async (req,res,next) =>
{
    const {Email,Password}=req.body;
    console.log(Password);
    if(!Email && Email.trim()==="" && !Password && Password.trim==="")
    {
        return res.status(400).json({
            Message:"Enter all Details"
        })
    }

    let user;
    try{
        user=await Admin.findOne({Email});
    } catch(err) {
        return res.status(404).json({
            Message:"Try Again"
        })
    }
     if(!user)
    {
        return res.status(402).json({
            message:"Unable to find by this id"
        })
    }
    console.log(Email)
    console.log(Password);
    const isPassword=bcrypt.compareSync(Password,user.Password);

    console.log(isPassword);
    if(!isPassword){
        return res.status(400).json(
        {
            message:"Please check Password"
        })
    }

    const token=jwt.sign({id:user._id},process.env.SECRET_KEY,{
        expiresIn:"7d",
    })


    return res.status(200).json({
        message:"Login Sucessfully",
        token,
        id:user._id
    })

}
