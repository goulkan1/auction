const express = require("express");
const router = express.Router();

const projectControllers = require("../controllers/project");
router.patch("/ubah/:id", projectControllers.ubahProject);
router.get("/project/:id", projectControllers.projectById);
router.delete("/project/:id", projectControllers.deleteProject);
router.get("/projects", projectControllers.getAllProject);
router.post("/project", projectControllers.tambahProject);
module.exports = router;
