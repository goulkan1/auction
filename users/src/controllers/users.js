const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.getAllUsers = async (req, res, next) => {
  User.find()
    .then((Users) => {
      res.json(Users);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
};

exports.deleteUser = async (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(() => {
      res.send("hapus user berhasil");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
};

exports.getUserId = async (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(400);
      }
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
};
