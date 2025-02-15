import express from "express"
import { createTask, deleteTask, deleteTasks, editStatus, editTask, editTasksDrag, editTasksStatus, getTasks } from "../controller/task.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();


router.post("/create",protectRoute,createTask)
router.get("/getTasks",protectRoute,getTasks)
router.put("/editTask",protectRoute,editTask)
router.delete("/deleteTask/:id",protectRoute,deleteTask)
router.patch("/editStatus",protectRoute,editStatus)
router.patch("/editTasksStatus",protectRoute,editTasksStatus)
router.patch("/deleteTasks",protectRoute,deleteTasks)
router.patch("/edit/:id",protectRoute,editTasksDrag)

export default router