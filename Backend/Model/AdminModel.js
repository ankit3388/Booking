import  mongoose  from "mongoose";

const Schema=mongoose.Schema;

const adminSchema = new Schema({
    Email:{
        type:String,
        unique:true,
        required:true,
    },
    Password:{
        type:String,
        minLength:6,
        required:true,
    },
    addedMovies:[{

        type:mongoose.Types.ObjectId,
        ref:"Movie",
    }]

});


export default mongoose.model("Admin",adminSchema)

