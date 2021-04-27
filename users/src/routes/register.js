const express = require("express");
const router = express.Router();

const registerController = require("../controllers/register");
router.put("/update/:id", registerController.updateUser);
router.post("/register", registerController.register);
router.post("/login", registerController.userLogin);
router.post("/logout", registerController.userLogout);

module.exports = router;
