const { StatusCodes } = require("http-status-codes");
const User = require("../models/user-model");
const sendResponse = require("../utils/response");

exports.createUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const user = await User.create({ name, email });
    return sendResponse(
      res,
      StatusCodes.CREATED,
      true,
      "User created successfully",
      user.id,
    );
  } catch (error) {
    next(error);
  }
};

exports.listOfUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments();
    const users = await User.find().skip(skip).limit(limit);

    return sendResponse(
      res,
      StatusCodes.OK,
      true,
      "Users fetched successfully",
      {
        users,
        pagination: {
          totalUsers,
          totalPages: Math.ceil(totalUsers / limit),
          currentPage: page,
          limit,
        },
      },
    );
  } catch (error) {
    next(error);
  }
};

exports.viewUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return sendResponse(
        res,
        StatusCodes.NOT_FOUND,
        false,
        `User with id ${req.params.id} not found`,
      );
    }
    return sendResponse(
      res,
      StatusCodes.OK,
      true,
      "User found successfully",
      user,
    );
  } catch (error) {
    next(error);
  }
};
