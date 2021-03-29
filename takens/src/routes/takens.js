const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth");

const usersTaken = require("../controllers/taken");

router.post("/taken", auth, usersTaken.tambahTaken);
router.get("/takens", auth, usersTaken.getAllTakens);
router.get("/taken/:id", auth, usersTaken.getTakenId);
router.delete("/taken/:id", auth, usersTaken.delete);

module.exports = router;
