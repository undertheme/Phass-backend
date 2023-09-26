const express = require("express");
const router = express.Router();

const userController = require("../controller/user");

router.post("/user/create", userController.create);
router.post("/user/remove", userController.remove);

module.exports = router;
