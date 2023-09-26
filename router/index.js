const express = require("express");
const router = express.Router();

const userController = require("../controller/user");
const sessionController = require("../controller/session");

router.post("/user/create", userController.create);
router.post("/user/remove", userController.remove);

router.post("/session/create", sessionController.create);

module.exports = router;
