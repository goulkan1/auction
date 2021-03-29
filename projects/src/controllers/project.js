const mongoose = require("mongoose");
const Project = mongoose.model("Project");

exports.ubahProject = async (req, res) => {
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
};

exports.projectById = (req, res) => {
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
};

exports.deleteProject = (req, res) => {
  Project.findByIdAndRemove(req.params.id)
    .then(() => {
      res.send("hapus project berhasil");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
};

exports.getAllProject = (req, res) => {
  Project.find()
    .then((projects) => {
      res.json(projects);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
};

exports.tambahProject = async (req, res) => {
  var newProject = {
    nama: req.body.nama,
    value: req.body.value,
    required: req.body.required,
    dekripsi: req.body.dekripsi,
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
};
