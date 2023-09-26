const express = require("express");
const router = express.Router();

const userController = require("../controller/user");

router.post("/user/create", userController.createuser);
router.post("/user/remove", userController.removeUser);

module.exports = router;
