const sendResponse = (res, statusCode, success, message, data = null) => {
  return res.status(statusCode).json({
    statusCode,
    status: success ? "success" : "error",
    message,
    data,
  });
};

module.exports = sendResponse;
