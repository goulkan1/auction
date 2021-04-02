const express = require("express");
const router = express.Router();

const registerController = require("../controllers/register");
router.post("/register", registerController.register);
router.post("/login", registerController.userLogin);
router.post("/logout", registerController.userLogout);
router.get("/islogin", registerController.isLoggin);

module.exports = router;
