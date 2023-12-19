import  mongoose from "mongoose";
import Booking from "../Model/Booking.js";
import Movies from "../Model/Movies.js";
import User from "../Model/User.js";

export const SeatBooking =async (req,res,next) =>{

   const{movie,date,seatNumber,user}=req.body


   let existingUser;
   let existingMovie;
   try{
    existingMovie =await Movies.findById(movie);
    existingUser =await User.findById(user);
   } catch(err)
   {
    return console.log(err);
   }



   if(!existingMovie)
   {
    return res.status(404).json({message:"Movies not found with give ID"})
   }
   if(!existingUser)
   {
    return res.status(404).json({message:"Movies not found with give ID"})
   }



   let newBooking;
   try{

    newBooking= new Booking({movie,date:new Date(`${date}`),seatNumber,user})

    const session =await mongoose.startSession();
    session.startTransaction();
    existingUser.Bookings.push(newBooking);
    existingUser.Bookings.push(newBooking);
    await existingMovie.save({session});
    await existingUser.save({session});

    newBooking=await newBooking.save();

   } catch(error)
   {
        return console.log(error);
   }

   if(!newBooking)
   {
    return res.status(404).json({
        message:"Booking failed",
    })
   }
   return res.status(200).json({newBooking});


}


export const getBookingById =async (req,res,next) =>{
    const id=req.params.id
    let booking;
    try{
        booking=await Booking.findById(id);
    } catch(err)
    {
        return console.log(err);
    }

    if(!booking){
        return res.status(404).json({message:"Unexpected Error"})
    }
    return res.status(300).json({booking
    })
}

export const deleteBooking=async (req,res,next) => {
    const id=req.params.id;
    let booking;
    try{
        booking =await Booking.findOneAndDelete().populate("user movie");
        const session =await mongoose.startSession();
        session.startTransaction();
        await booking.user.Bookings.pull(booking);
        await booking.movie.Bookings.pull(booking);
        await booking.user.save({session})
        await booking.movie.save({session})
        session.commitTransaction();


    } catch(err)
    {
        return res.status(404).json({
            Message:"Request failed",
        })
    }
}