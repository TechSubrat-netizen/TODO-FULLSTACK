import mongoose from "mongoose";
import dotenv from'dotenv'
dotenv.config()
 const connectDb= async ()=>{
    try {
        mongoose.connect(process.env.DB_URL);
        console.log("Database is connceted");
        
    } catch (error) {
         console.log(error);
         
    }
 }
 export default connectDb