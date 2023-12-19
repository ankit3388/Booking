// const mongoose=require("mongoose");
import mongoose from "mongoose";
const Schema=mongoose.Schema;

const UserScema= new Schema({
    Name:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
        unique:true,
    },
    Password:{
        type:String,
        required:true,
        minLength:6,

    },
    booking:[{type:mongoose.Types.ObjectId,ref:"Booking"}],



})

export default mongoose.model("User",UserScema);