import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  dueDate: {
    day: { type: Number, required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true }
  },
  status: {
    type: String,
    enum: ['Todo', 'In-Progress', 'Completed'],
    default: 'Todo'
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  description:{
    type: String,
  },
  createdBy: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Task = mongoose.model("Task",taskSchema)

export default Task
