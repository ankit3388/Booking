console.log("frome server side")
import express from "express"
import dotenv  from "dotenv";
import { mongoose } from "mongoose";
import userRouter from './Routes/userRoutes.js';
import adminRouter  from "./Routes/adminRoute.js";
import MovieRouter from "./Routes/movieRoute.js";
import BookingRouter from "./Routes/bookingRoute.js";
import cors from "cors"

// import userRoutes from '../Routes/userRoutes.js';

const app=express();

// to use always json format
app.use(express.json())
dotenv.config();




mongoose.connect(`mongodb+srv://bantiyd:${process.env.PASSWORDMOGODB}@classreservation.utajsix.mongodb.net/?retryWrites=true&w=majority`)
.then( () =>{
    console.log("connection sucessully with mongoDb")
}
).then( (err)=>
{
    console.log(err);
}

)
app.use(cors());
app.use("/user",userRouter)
app.use("/admin",adminRouter);
app.use("/movie",MovieRouter)
app.use("/booking",BookingRouter)







// app.get("/",(req,res)=>{

//     res.json({
//         Name:"Ankit",
//         Age:"20"
//     });
// })




// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
//   });



// HTTP/1.1 200 OK;
// Access-Control-Allow-Origin: https://localhost3000
// Access-Control-Allow-Methods: GET, DELETE, HEAD, OPTIONS

app.listen(5000,()=>
{
    console.log("server started sucess fully")
})