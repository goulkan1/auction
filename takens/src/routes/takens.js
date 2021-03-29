const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth");

const takenControllers = require("../controllers/taken");

router.post("/taken", auth, takenControllers.tambahTaken);
router.get("/takens", auth, takenControllers.getAllTakens);
router.get("/taken/:id", auth, takenControllers.getTakenId);
router.delete("/taken/:id", auth, takenControllers.delete);

module.exports = router;
