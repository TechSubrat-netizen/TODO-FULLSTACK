import express from 'express'
import { getData,addTask,updateTask,deleteTask,getTaskById} from '../controller/todoController.js';
const todoRoute=express.Router();

todoRoute.get('/',getData);
 todoRoute.post('/add',addTask);
 todoRoute.put('/update/:id',updateTask)
 todoRoute.delete('/delete/:id',deleteTask)
 todoRoute.get('/getTaskById/:id',getTaskById)











export default todoRoute