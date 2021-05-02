const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth");
const projectControllers = require("../controllers/project");
router.patch("/project/:id", auth, projectControllers.ubahProject);
router.get("/project/:id", projectControllers.projectById);
router.delete("/project/:id", auth, projectControllers.deleteProject);
router.get("/projects", projectControllers.getAllProject);
router.post("/project", auth, projectControllers.tambahProject);
router.get("/category", projectControllers.getAllCategories);
router.get("/category/:id", projectControllers.getAllByCategories);

module.exports = router;
