require("dotenv").config();
const express = require("express");
const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const userRouter = require("./controller/user.controller");
const taskRouter = require("./controller/task.controller");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.log("MongoDB connection error:", err);
    process.exit(1);
  });

app.use("/users", userRouter);
app.use("/tasks", taskRouter);

app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    statusCode: StatusCodes.NOT_FOUND,
    status: "error",
    message: "Route not found",
  });
});

const errorHandler = require("./utils/error-handler/error-handler");
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
