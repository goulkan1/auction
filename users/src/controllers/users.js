const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.getAllUsers = async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 5;
  let totalItems;

  User.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return User.find()
        .skip((parseInt(currentPage) - 1) * perPage)
        .limit(parseInt(perPage));
    })
    .then((result) => {
      res.status(200).json({
        data: result,
        total_data: totalItems,
        per_page: parseInt(perPage),
        current_page: parseInt(currentPage),
      });
    })
    .catch((err) => {});
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
