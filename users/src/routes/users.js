const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth");

const usersController = require("../controllers/users");

router.get("/users", auth, usersController.getAllUsers);
router.delete("/user/:id", auth, usersController.deleteUser);
router.get("/user/:id", auth, usersController.getUserId);
module.exports = router;
