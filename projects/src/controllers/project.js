const mongoose = require("mongoose");
const Project = mongoose.model("Project");
const redis = require("redis");
mongoose.set("useFindAndModify", true);
const client = redis.createClient();

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
  res.status(201).send(result);
};

exports.projectById = (req, res) => {
  const redisKey = req.params.id;
  client.get(redisKey, async (err, data) => {
    if (data) {
      res.status(200).send({ isCached: true, data: JSON.parse(data) });
    } else {
      const fetchData = Project.findById(redisKey).then((result) => {
        client.set(redisKey, JSON.stringify(result), "EX", 60);
        res.status(200).send({ data: result });
      });
    }
  });

  // Project.findById(req.params.id)
  //   .then((project) => {
  //     if (project) {
  //       res.json(project);
  //     } else {
  //       res.status(404);
  //     }
  //   })
  //   .catch((err) => {
  //     if (err) {
  //       throw err;
  //     }
  //   });
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

exports.getAllProject = async (req, res) => {
  const redisKey = "project";
  client.get(redisKey, async (err, data) => {
    if (data) {
      res.status(200).send({ isCached: true, data: JSON.parse(data) });
    } else {
      const fetchData = Project.find().then((result) => {
        client.set(redisKey, JSON.stringify(result), "EX", 60);
        res.status(200).send({ data: result });
      });
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
  res.status(201).send(data);
};
