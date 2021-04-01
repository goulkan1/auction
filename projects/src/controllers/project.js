const mongoose = require("mongoose");
const Project = mongoose.model("Project");
mongoose.set("useFindAndModify", true);

exports.ubahProject = async (req, res) => {
  const options = { new: true, upsert: true };
  const id = req.params.id;
  var updateProject = {
    title: req.body.title,
    information: req.body.information,
    category: req.body.category,
    method: req.body.method,
    fiscal: req.body.fiscal,
    value: req.body.value,
    payment: req.body.payment,
    location: req.body.location,
    qualification: req.body.qualification,
    term: req.body.term,
    status: req.body.status,
    idUser: mongoose.Types.ObjectId(req.body.idUser),
  };
  result = await Project.findOneAndUpdate({ _id: id }, updateProject, options);
  res.status(200).send(result);
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
    title: req.body.title,
    information: req.body.information,
    category: req.body.category,
    method: req.body.method,
    fiscal: req.body.fiscal,
    value: req.body.value,
    payment: req.body.payment,
    location: req.body.location,
    qualification: req.body.qualification,
    term: req.body.term,
    status: req.body.status,
    idUser: mongoose.Types.ObjectId(req.body.idUser),
  };

  var project = new Project(newProject);
  const result = await project.save();
  const { ...data } = await result.toJSON();
  res.send(data);
};
