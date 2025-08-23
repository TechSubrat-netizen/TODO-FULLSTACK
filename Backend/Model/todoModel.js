import mongoose from "mongoose";
import todoSchema from "../Schema/todoSchema.js";

const todoModel= mongoose.model('Task',todoSchema);

export default todoModel