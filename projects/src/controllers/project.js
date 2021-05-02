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
    deadLine: req.body.deadline,
    category: req.body.category,
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
      const fetchData = Project.findById(redisKey)
        .populate("idUser")
        .then((result) => {
          client.set(redisKey, JSON.stringify(result), "EX", 60);
          res.status(200).send({ data: result });
        });
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

exports.getAllProject = async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 25;
  let totalItems;
  const redisKey = "project";
  client.get(redisKey, async (err, data) => {
    if (data) {
      res.status(200).send({ data: JSON.parse(data), isCached: true });
    } else {
      const fetchData = Project.find()
        .countDocuments()
        .then((count) => {
          totalItems = count;
          return Project.find()
            .sort({ datePublished: -1 })
            .populate("idUser", "nama")
            .skip((parseInt(currentPage) - 1) * perPage)
            .limit(parseInt(perPage));
        })
        .then((result) => {
          client.set(redisKey, JSON.stringify(result), "EX", 60);
          res.status(200).send({
            data: result,
            total_data: totalItems,
            per_page: parseInt(perPage),
            current_page: parseInt(currentPage),
          });
        });
    }
  });
};

exports.tambahProject = async (req, res) => {
  var newProject = {
    title: req.body.title,
    information: req.body.information,
    deadLine: req.body.deadline,
    category: req.body.category,
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

exports.getAllCategories = async (req, res) => {
  let totalItems;
  const redisKey = "category";
  client.get(redisKey, async (err, data) => {
    if (data) {
      res.status(200).send({
        isCached: true,
        data: JSON.parse(data),
        total_data: totalItems,
      });
    } else {
      const fetchData = Project.find()
        .countDocuments()
        .then((count) => {
          totalItems = count;
          return Project.find({}, { category: 1 }).distinct("category");
        })
        .then((result) => {
          client.set(redisKey, JSON.stringify(result), "EX", 60);
          res.status(200).send({ data: result, total_data: totalItems });
        });
    }
  });
};

exports.getAllByCategories = async (req, res) => {
  const redisKey = req.params.id;
  client.get(redisKey, async (err, data) => {
    if (data) {
      res.status(200).send({
        data: JSON.parse(data),
        total_data: totalItems,
        isCached: true,
      });
    } else {
      const fetchData = Project.find()
        .countDocuments()
        .then((count) => {
          totalItems = count;
          return Project.find({ category: redisKey }).populate("idUser");
        })
        .then((result) => {
          client.set(redisKey, JSON.stringify(result), "EX", 60);
          res.status(200).send({ data: result, total_data: totalItems });
        });
    }
  });
};
