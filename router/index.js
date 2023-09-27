const express = require("express");

const router = express.Router();

const userController = require("../controller/user");
const sessionController = require("../controller/session");
const lureController = require("../controller/lure");
const rdpController = require("../controller/rdp");

router.post("/user/create", userController.create);
router.post("/user/remove", userController.remove);

router.post("/session/create", sessionController.create);

router.post("/lures/create", lureController.create);

router.post("/rdp/create", rdpController.create);
router.get("/rdp/all", rdpController.getAll);
router.post("/rdp/remove", rdpController.remove);

module.exports = router;
