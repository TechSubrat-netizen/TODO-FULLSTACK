import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [error,setError]=useState(true);
  const [update,setUpdate]=useState(true);
  const [updateId,setUpdateID]=useState(null)

  // send task to the backend
  async function AddTask() {
    try {
      if(!task){
       setError(false)
      }
      if(updateId){
        const updateTask=await fetch(`http://localhost:3000/todo/update/${updateId}`,{
         method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ task })
       });
       const res=await updateTask.json()
       console.log(res);
             setTask('');
      setUpdate(true);
      setUpdateID(null);
      showAlltask();
      setError(true)
      }
      else{
      const sendtask = await fetch('http://localhost:3000/todo/add', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ task })
      });

      const response = await sendtask.json();
      setTask('');
      showAlltask();
      setError(true)
      console.log(response);
    }
    } catch (error) {
      console.log(error);
    }
  }

  // show all the tasks
  async function showAlltask() {
    let task = await fetch('http://localhost:3000/todo/');
    task = await task.json();
    setTasks(task);
  }

  useEffect(() => {
    showAlltask();
  }, []);
  //get Task By Id
  async function getTaskById(id){
    try {
      const getTask=await fetch(`http://localhost:3000/todo/getTaskById/${id}`);
      const res= await getTask.json();
      setTask(res.task)
      setUpdate(false);
      setUpdateID(id)
      
    } catch (error) {
      console.log(error);
      
    }

  }
  //update Task By id
  async function updateTask(id){
    try {
      if(!task){
         setError(false)
      }
      else{
       const updateTask=await fetch(`http://localhost:3000/todo/update/${id}`,{
         method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ task })
       });
       const res=await updateTask.json()
       console.log(res);
       
      }
      
    } catch (error) {
      console.log(error);
      
    }
  }
  //Delete  todo list
  async function deleteTask(id){
    try {
      let deleteTask= await fetch(`http://localhost:3000/todo/delete/${id}`, {
      method: "DELETE",
    });
      let res=deleteTask.json();
   console.log(res);
   showAlltask()
   
      
    } catch (error) {
      console.log(error);
      
    }
  }


  return (
    <div className="todo-container">
      <h1 className="todo-header">My Todo List</h1>
      
      <div className="input-container">
        <input
          className="todo-input"
          type="text"
          placeholder="Enter the task"
          value={task}
          onChange={e => setTask(e.target.value)}
        />
        <button className="todo-button" onClick={AddTask}>
          {update ? 'Add' : "Update"}
        </button>
      </div>
      
      {!error && <h2 className="error-message">Please add tasks</h2>}

      <div className="todo-list">
        {tasks.map((e, index) => (
          <div className="todo-item" key={index}>
            <h2 className="todo-text">{e.task}</h2>
            <div className="button-group">
              <button 
                className="todo-button update-button" 
                onClick={() => getTaskById(e._id)}
              >
                Update
              </button>
              <button 
                className="todo-button delete-button" 
                onClick={() => deleteTask(e._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
