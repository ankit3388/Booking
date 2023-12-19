import express from "express"
import {getAllusers,signUp,updatePassword,deleteuser,Validation, getBookingOfUser, getusersById} from "../Controller/userController.js";



const userRouter= express.Router();

// localhost.8000/user/getAllusers
userRouter.get("/",getAllusers)
userRouter.post("/signup",signUp)
userRouter.get("/:id",getusersById)
userRouter.put("/:id",updatePassword);
userRouter.delete("/:id",deleteuser);
userRouter.post("/login",Validation)
userRouter.post("/bookings/:id",getBookingOfUser)

export default userRouter;