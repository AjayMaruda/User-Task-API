const sendResponse = require("../response");
const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  console.error(`${err.name}: ${err.message}`);

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return sendResponse(
      res,
      StatusCodes.BAD_REQUEST,
      false,
      messages.join(", "),
    );
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return sendResponse(
      res,
      StatusCodes.BAD_REQUEST,
      false,
      `${field} already exists`,
    );
  }

  if (err.name === "CastError") {
    return sendResponse(
      res,
      StatusCodes.BAD_REQUEST,
      false,
      "Invalid ID format",
    );
  }

  return sendResponse(
    res,
    err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    false,
    err.message || "Internal Server Error",
  );
};

module.exports = errorHandler;
