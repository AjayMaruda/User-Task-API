const express = require("express");
const router = express.Router();
const taskService = require("../service/task.service");

router.post("/addTask", taskService.createTask);
router.get("/listOfTasks", taskService.listOfTasks);
router.put("/updateTask/:id", taskService.updateTaskStatus);
router.delete("/deleteTasksByUser/:id", taskService.deleteTask);
router.get("/users/:id/tasks", taskService.viewTasksByUser);

module.exports = router;
