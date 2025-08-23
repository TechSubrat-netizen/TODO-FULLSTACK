import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import todoRoute from './Routes/todoRoute.js';
import cors from'cors'
app.use(cors())
dotenv.config()

const app=express();

//l middlewares
app.use(express.json())
app.use('/todo',todoRoute)






//Database  connection
connectDb()


//running the server
 const port= process.env.PORT||3000
app.listen(port,"localhost",()=>{
    console.log(`server is running on  http://localhost:${port}`);
    
})
