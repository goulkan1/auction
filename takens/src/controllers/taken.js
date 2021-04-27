const mongoose = require("mongoose");
const Taken = mongoose.model("Taken");

exports.tambahTaken = async (req, res) => {
  var newTakens = {
    idProject: mongoose.Types.ObjectId(req.body.idProject),
    idUser: mongoose.Types.ObjectId(req.body.idUser),
    userBid: req.body.userBid,
    specific: req.body.specific,
    prices: parseInt(req.body.prices),
  };
  var taken = new Taken(newTakens);
  const result = await taken.save();
  const { ...data } = await result.toJSON();
  res.send(data);
};

exports.getAllTakens = (req, res) => {
  Taken.find()
    .then((takens) => {
      res.json(takens);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
};

exports.getTakenId = (req, res) => {
  Taken.findById(req.params.id)
    .populate("userBid")
    .then((taken) => {
      if (taken) {
        res.json(taken);
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

exports.delete = (req, res) => {
  Taken.findByIdAndRemove(req.params.id)
    .then((taken) => {
      res.send("project takens berhasil di hapus");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
};
