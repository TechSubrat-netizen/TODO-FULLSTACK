import express from 'express'
import { getData,addTask,updateTask,deleteTask } from '../controller/todoController.js';
const todoRoute=express.Router();

todoRoute.get('/',getData);
 todoRoute.post('/add',addTask);
 todoRoute.put('/update/:id',updateTask)
 todoRoute.delete('/delete/:id',deleteTask)











export default todoRoute