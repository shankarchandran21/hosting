import Task from "../models/task.modal.js"

const createTask = async(req,res)=>{
    const { name, dueDate, category, status,description } = req.body;
    const createdBy = req.cookies.task.uid;

    if (!createdBy) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
  
    try {
      const task = new Task({
        name,
        dueDate,
        category,
        status,
        description,
        createdBy
      });
  
      const savedTask = await task.save();
      res.status(200).json({ ...savedTask.toObject(), id: savedTask._id });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }


}


const getTasks = async(req,res)=>{
  const createdBy = req.cookies.task.uid;

  if (!createdBy) {
    return res.status(400).json({ message: 'Missing UID in cookie' });
}

try {
  const tasks = await Task.find({ createdBy:createdBy });

  if (!tasks || tasks.length === 0) {
    return res.status(200).json({
      Todo: [],
      "In-Progress": [],
      Completed: [],
    });
  }

  const groupedTasks = {
    Todo: [],
    "In-Progress": [],
    Completed: [],
  };

  tasks.forEach(task => {
    const formattedTask = {
      id: task.id,
      name: task.name,
      dueDate: {
        day: task.dueDate.day,
        month: task.dueDate.month,
        year: task.dueDate.year
      },
      category: task.category,
      status:task.status.toUpperCase(),
      description:task.description
    };

    if (task.status === 'Todo') {
      groupedTasks.Todo.push(formattedTask);
    } else if (task.status === 'In-Progress') {
      groupedTasks["In-Progress"].push(formattedTask);
    } else if (task.status === 'Completed') {
      groupedTasks.Completed.push(formattedTask);
    }
  });

  res.status(200).json(groupedTasks);

} catch (error) {
  console.error('Error fetching tasks:', error);
  res.status(500).json({ message: 'Internal server error' });
}

}

const editTask = async(req,res)=>{
  const { id, data } = req.body;
  const createdBy = req.cookies.task?.uid;
  console.log(data)
  try {

    const task = await Task.findOne({ _id: id });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (task.createdBy.toString() !== createdBy) {
      return res.status(403).json({ error: "You are not authorized to edit this task" });
    }


    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );

    res.status(200).json({ ...updatedTask.toObject(), id: updatedTask._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const deleteTask =async(req,res)=>{
   const {id} = req.params
   const createdBy = req.cookies.task.uid;
  console.log(id)
   try {

    const task = await Task.findOne({ _id: id });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (task.createdBy.toString() !== createdBy) {
      return res.status(403).json({ error: "You are not authorized to delete this task" });
    }


    await Task.deleteOne({ _id: id });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

}

const editStatus = async(req,res)=>{
  const {id,status} = req.body
  const createdBy = req.cookies.task.uid;
  
  try {
   
    const task = await Task.findOne({ _id: id });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (task.createdBy.toString() !== createdBy) {
      return res.status(403).json({ error: "You are not authorized to update this task" });
    }


    task.status = status;
    await task.save();

    res.status(200).json({ ...task.toObject(), id: task._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

}

const editTasksStatus =async(req,res)=>{
    const {tasksId,status} = req.body
    const createdBy = req.cookies.task.uid;

    try {

      const tasks = await Task.find({ _id: { $in: tasksId }, createdBy });
  
      if (tasks.length !== tasksId.length) {
        return res.status(403).json({ error: "You are not authorized to update one or more tasks" });
      }
  
      await Task.updateMany(
        { _id: { $in: tasksId }, createdBy },
        { $set: { status } }
      );
  
      res.status(200).json({ message: "Tasks updated successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }

  }

  const deleteTasks = async (req, res) => {
    const { tasksId } = req.body; // Expecting an array of task IDs
    const createdBy = req.cookies.task?.uid;
    
    if (!createdBy) {
      return res.status(401).json({ error: "User not authenticated" });
    }
  
    try {
      // Find the tasks and ensure all belong to the logged-in user
      const tasks = await Task.find({ _id: { $in: tasksId }, createdBy });
  
      if (tasks.length !== tasksId.length) {
        return res.status(403).json({ error: "You are not authorized to delete one or more tasks" });
      }
  
      // Delete the matching tasks
      await Task.deleteMany({ _id: { $in: tasksId }, createdBy });
  
      res.status(200).json({ message: "Tasks deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  const editTasksDrag=async (req, res) => {
    try {
      const { status, index } = req.body; // Get the updated status and index
      const {id } = req.params;
  
      const updatedTask = await Task.findByIdAndUpdate(
        {_id:id},
        { status },
        { new: true }
      );
  
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      res.status(200).json(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
export{createTask,getTasks,editTask,deleteTask,editStatus, editTasksStatus,deleteTasks,editTasksDrag }