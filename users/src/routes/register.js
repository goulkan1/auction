const express = require("express");
const router = express.Router();

const registerController = require("../controllers/register");

router.put("/update/:id", registerController.updateUser);
router.get("/verify/:uniqueString", registerController.verify);
router.post("/register", registerController.register);
router.post("/login", registerController.userLogin);
router.post("/logout", registerController.userLogout);
router.get("/forgotpassword/:email", registerController.forgotPassword);
router.post("/forgot/:uniqueString", registerController.forgot);

module.exports = router;
