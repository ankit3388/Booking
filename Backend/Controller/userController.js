
import Booking from "../Model/Booking.js";
import User from "../Model/User.js";

// get data from the user as requested

import bcrypt from "bcryptjs"
export const getAllusers = async (req,res,next) => {

    let users;
    try{
        // it will check all user from data base if we not provide;
       // console.log("from getAll users")
        users=await User.find();
    } catch (err){
        return console.log(err);
    }
    if(!users)
    {
        console.log("from getAll users")
        return res.status(500).json({message:"Unexpected Error Occur "})
    }
    return res.status(200).json({users});
}


// TO write/make a Entry  a database in use post function


export const signUp= async (req,res,next) =>{

    const {Name, Email,Password}=req.body;

    if(!Email && Email.trim()==="" && !Name && Name.trim()==="" && !Password && Password.trim()==="")
    {
        // respons for 420 to invalid data
        return res.status(420).json(
            {
                message:"Invalid inputs"
            }
        )
    }
    const CryptPassword=bcrypt.hashSync(Password);
    let user;
    try{
        user=new User({Name,Email,Password:CryptPassword});
        user=await user.save();

    }catch (err) {
        return console.log(err);
    }
    if(!user){
        return res.status(500).json({
            message:"Unexpected Error Occured",
        })
    }
    return res.status(201).json({id:user._id});
}


export const updatePassword= async (req,res,next) => {
    console.log("Update ");
    const id=req.params.id;
    const {Name, Email,Password}=req.body;
    if(!Email && Email.trim()==="" && !Name && Name.trim()==="" && !Password && Password.trim()==="")
    {
        // respons for 420 to invalid data
        return res.status(420).json(
            {
                message:"Invalid inputs"
            }
        )
    }
    const decryptedPassword= bcrypt.hashSync(Password);
    let user;
    try{
        user=await User.findByIdAndUpdate(id,{
            Name,Email,Password:decryptedPassword,
        })

    } catch(err) {
        return console.log(err);
    }

    if(!user){
        return res.status(500).json({
            message:"Some things went worng",
        })
    }
    return res.status(200).json({
        message:"updated SucessFully"
    });
}

export const deleteuser =async (req,res,next) => {

    const id=req.params.id;
    let user;
    try{
        user = await User.findByIdAndDelete(id);
    } catch(err){
        return console.log(err);
    }

    if(!user){
        return res.status(500).json({
            message:"Somethings went worng"
        })
    }
    return res.status(200).json({
        message:"Deleted Successfully"
    })
}


export const Validation=async (req,res,next) => {

    console.log("Validation");

    const {Email,Password}=req.body;
    console.log(Email);
    console.log(Password);

    if(!Email && Email.trim()==="" && !Password && Password.trim()==="")
    {
        // respons for 420 to invalid data
        return res.status(420).json(
            {
                message:"Invalid inputs"
            }
        )
    }

    let existingUser;
    try{
        existingUser= await User.findOne({Email});

    } catch (err){
        return console.log(err)

    }
    if(!existingUser)
    {
        return res.status(402).json({
            message:"Unable to find by this id"
        })
    }
    // bool value in checkPassword
    const checkPassword=bcrypt.compareSync(Password,existingUser.Password);

    if(!checkPassword){
        return res.status(400).json(
        {
            message:"Please check Password"
        })
    }
    return res.status(200).json({

        message:"Login Sucessfully",
        id:existingUser._id
    })

}

export const getBookingOfUser= async (req,res,next) =>{
    const id=req.params.id;
    let booking
    try{
        booking=await Booking.find({User:id});
    } catch(err) {
        return console.log(err);
    }

    if(!booking)
    {
        return res.status(404).json({
            message:"Request Failed"
        })
    }
    return res.status(200).json({booking})
}

export const getusersById = async (req,res,next) => {

    const id=req.params.id;
    let user;
    try{
        // it will check all user from data base if we not provide;
       // console.log("from getAll users")
        user=await User.findById(id);
    } catch (err){
        return console.log(err);
    }
    if(!user)
    {
        console.log("from getAll users")
        return res.status(500).json({message:"Unexpected Error Occur "})
    }
    return res.status(200).json({user});
}
