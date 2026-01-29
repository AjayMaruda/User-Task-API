const Task = require("../models/task-model");
const User = require("../models/user-model");
const sendResponse = require("../utils/response");
const { StatusCodes } = require("http-status-codes");

exports.createTask = async (req, res, next) => {
  try {
    const { title, userId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return sendResponse(
        res,
        StatusCodes.NOT_FOUND,
        false,
        `User with id ${userId} not found`,
      );
    }

    const task = await Task.create({ title, userId });

    return sendResponse(
      res,
      StatusCodes.CREATED,
      true,
      "Task created successfully",
      task.id,
    );
  } catch (error) {
    next(error);
  }
};

exports.listOfTasks = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalTasks = await Task.countDocuments();
    const tasks = await Task.find()
      .populate("userId", "name email")
      .skip(skip)
      .limit(limit);

    return sendResponse(
      res,
      StatusCodes.OK,
      true,
      "Tasks fetched successfully",
      {
        tasks,
        pagination: {
          totalTasks,
          totalPages: Math.ceil(totalTasks / limit),
          currentPage: page,
          limit,
        },
      },
    );
  } catch (error) {
    next(error);
  }
};

exports.viewTasksByUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tasks = await Task.find({ userId: id });

    if (!tasks || tasks.length === 0) {
      return sendResponse(
        res,
        StatusCodes.NOT_FOUND,
        false,
        `No tasks found for user with id ${id}`,
      );
    }

    return sendResponse(
      res,
      StatusCodes.OK,
      true,
      "Tasks fetched successfully",
      tasks,
    );
  } catch (error) {
    next(error);
  }
};

exports.updateTaskStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const task = await Task.findById(id);

    if (!task) {
      return sendResponse(
        res,
        StatusCodes.NOT_FOUND,
        false,
        `Task with id ${id} not found`,
      );
    }
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { completed },
      { new: true },
    );
    return sendResponse(
      res,
      StatusCodes.OK,
      true,
      "Task status updated successfully",
      updatedTask,
    );
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) {
      return sendResponse(
        res,
        StatusCodes.NOT_FOUND,
        false,
        `Task with id ${id} not found`,
      );
    }

    const deletedTask = await Task.findByIdAndDelete(id);
    return sendResponse(
      res,
      StatusCodes.OK,
      true,
      "Task deleted successfully",
      deletedTask,
    );
  } catch (error) {
    next(error);
  }
};
