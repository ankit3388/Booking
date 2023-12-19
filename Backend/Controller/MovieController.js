import jwt from "jsonwebtoken"
import Movies from "../Model/Movies.js";
import mongoose  from "mongoose";



export const addMovie =async (req,res,next)=>{


   //to get first value will token from header
    const extractedToken= req.headers.authorization.split(" ")[1];
   console.log(extractedToken);


    if(!extractedToken && extractedToken.trim()==="")
    {
        return res.status(404).json({message:"Token Not Found"});
    }
    let adminId
    jwt.verify(extractedToken,process.env.SECRET_KEY,(err,decrypted) =>{
        if(err)
        {
            return res.status(400).json({message:`${err.message}`});
        } else{
            adminId=decrypted.id;
            return;
        }
    });
    console.log(extractedToken);

    const {Name,Description,Actor,ReleaseDate,PosterURL,Featured,Booking,Admin} =req.body;


    if(!Name && Name.trim()==="" && !Description && Description==="" && !ReleaseDate && ReleaseDate.trim()==="" && !PosterURL && PosterURL.trim()==="",!Featured && Featured.trim()==="" && !Booking && Booking==="" && !Admin && Admin==="" && !Actor && Actor.trim()==="")
    {
        return res.status(422).json({message:"Invalid Inputs"})
    }


    let movie;
    try{
        movie=new Movies({
            Name,Description,Actor,ReleaseDate: new Date(`${ReleaseDate}`),PosterURL,Featured,Booking,Admin
        });

        const session =await mongoose.startSession();
        const adminUser =await Admin.findById(adminId);
        session.startTransaction();
        await movie.save({session});

        adminUser.addMovie.push(movie);
        await adminUser.save({session});
        await session.commitTransaction();
        




    } catch(err){
        return console.log(err);
    }

    if(!movie){
        return res.status(500).json({message:"Request Failed"})
    }
    return res.status(400).json({movie})
}

export const getAllMovies=async (req,res,next) =>{

    let movies;

    try{
        movies =await Movies.find();

    } catch(err)
    {
        return res.status(404).json({
            message:"Request Failed"
        })
    }

    if(!movies){
        return res.status(500).json({
            message:"Request failed"
        })
    }
    return res.status(200).json({movies})
}

export const getmoviesById =async (req,res,next) =>{
    const id=req.params.id;
    let movie ;

    try{
        movie =await Movies.findById(id)
    } catch(err){
        return console.log(err);
    }


    if(!movie){
        return res.status(404).json({
            message:"invalid Movie "
        })
    }
    return  res.status(404).json({movie})
}


