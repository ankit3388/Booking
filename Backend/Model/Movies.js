import mongoose from "mongoose";

const MovieSchema= new mongoose.Schema({
    Name:{
        type:String,
        required:true,

    },
    Description:{
        type:String,
        required:true,

    },
    Actor:[{
        type:String,
        require:true,
    }],
    ReleaseDate:{
        type:String,
        required:true,

    },
    PosterURL:{
        type:String,
        required:true,

    },
    Featured:{
        type:Boolean,
    },
    Bookings:[{
        type:mongoose.Types.ObjectId,
        ref:"Booking"
    }],
    Admin:{
        type:mongoose.Types.ObjectId,
        ref:"Movie",
        required:true
    },
})
export default mongoose.model("Movies",MovieSchema);
