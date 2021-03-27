const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("./Project");
const Project = mongoose.model("Project");
const auth = require("./middleware/auth");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

mongoose.connect(
  "mongodb+srv://dbUser:dbUser@cluster0.7so1o.mongodb.net/projects?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  console.log("konek database")
);
app.post("/project", async (req, res) => {
  var newProject = {
    nama: req.body.nama,
    value: req.body.value,
    required: req.body.required,
    deskripsi: req.body.deskripsi,
    status: req.body.status,
    expires: req.body.expires,
    startProject: req.body.startProject,
    endProject: req.body.endProject,
    nMilestone: req.body.nMilestone,
    kategori: req.body.kategori,
    idUser: mongoose.Types.ObjectId(req.body.idUser),
  };

  var project = new Project(newProject);
  const result = await project.save();
  const { ...data } = await result.toJSON();
  res.send(data);
});

app.get("/projects", auth, (req, res) => {
  Project.find()
    .then((projects) => {
      res.json(projects);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.patch("/ubah/:id", auth, async (req, res) => {
  const options = { new: true };
  const id = req.params.id;
  var updateProject = {
    nama: req.body.nama,
    value: req.body.value,
    required: req.body.required,
    deskripsi: req.body.deskripsi,
    status: req.body.status,
    expires: req.body.expires,
    startProject: req.body.startProject,
    endProject: req.body.endProject,
    nMilestone: req.body.nMilestone,
    kategori: req.body.kategori,
    idUser: mongoose.Types.ObjectId(req.body.idUser),
  };
  result = await Project.findOneAndUpdate(id, updateProject, options);
  res.send(result);
});

app.get("/project/:id", auth, (req, res) => {
  Project.findById(req.params.id)
    .then((project) => {
      if (project) {
        res.json(project);
      } else {
        res.status(404);
      }
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.delete("/project/:id", auth, (req, res) => {
  Project.findByIdAndRemove(req.params.id)
    .then(() => {
      res.send("hapus project berhasil");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.listen(8002, () => {
  console.log(`Server started on port 8002`);
});
