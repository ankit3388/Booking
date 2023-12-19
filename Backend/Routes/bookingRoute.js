import express from "express"
import { SeatBooking, deleteBooking, getBookingById } from "../Controller/BookingController.js"

const BookingRouter=express.Router()

BookingRouter.post("/",SeatBooking)
BookingRouter.get("/:id",getBookingById)
BookingRouter.delete("/:id",deleteBooking)

export default BookingRouter