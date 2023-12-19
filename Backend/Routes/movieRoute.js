import express from "express"
import { addMovie, getAllMovies, getmoviesById } from "../Controller/MovieController.js";

const MovieRouter=express.Router();

MovieRouter.get("/:id",getmoviesById)
MovieRouter.post("/",addMovie);
MovieRouter.get("/allmovies",getAllMovies)


export default MovieRouter
