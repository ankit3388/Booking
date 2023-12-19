import mongoose from "mongoose";

const bookingSchema=new mongoose.Schema({
    movie:{
        type:mongoose.Types.ObjectId,
        ref:"Movie",
        require:true,
    },
    date:{
        type:String,
        required:true,

    },
    seatNumber:{
        type:Number,
        require:true,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        require:true,

    }
});




export default mongoose.model("Booking",bookingSchema)
