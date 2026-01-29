const exppress = require("express");
const router = exppress.Router();
const userService = require("../service/user.service");

router.post("/addUser", userService.createUser);
router.get("/listOfUsers", userService.listOfUsers);
router.get("/viewUser/:id", userService.viewUser);

module.exports = router;
