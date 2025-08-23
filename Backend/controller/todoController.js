import todoModel from "../Model/todoModel.js";

// Get all task
 export const getData= async (req,res)=>{
  try {
     const data= await todoModel.find();
     res.status(200).send(data)
    
  } catch (error) {
     res.status(500).send({msg:"There si something wromng in your server"})
  }
}

//add Data
export const addTask = async (req,res) => {
    try {
        const task = req.body;
        console.log(task);
        await todoModel.create(task)
        res.status(201).json({msg: "Data inserted successfully"})
    } catch (error) {
        res.status(500).send({msg: "Something went wrong here"})
    }
}

//Update  Task
export const updateTask = async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        
        const updatedTask = await todoModel.findByIdAndUpdate(
            id,
            { $set: updates },  
            { new: true }
        );
        
        if (!updatedTask) {
            return res.status(404).json({ msg: "Task not found" });
        }
        
        res.status(200).json({ msg: "Task updated successfully", updatedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}
//Delete  task
export const deleteTask= async(req,res)=>{
   try {
       const id=req.params.id;
       await todoModel.deleteOne({_id:id});
       res.status(200).json({msg:"Task deleted successfully"})
      
   } catch (error) {
       res.status(500).send({msg:"There is something  went wrong"})
   }

}
