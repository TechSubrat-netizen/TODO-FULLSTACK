import mongoose from "mongoose";
 const todoSchema=new mongoose.Schema({

  task:{type:"String",require:true}
  
 })
 export default todoSchema;