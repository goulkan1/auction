const mongoose = require("mongoose");
const User = mongoose.model("User");

const amqp = require("amqplib/callback_api");

exports.getAllUsers = async (req, res) => {
  amqp.connect("amqp://localhost", function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
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
          channel.sendToQueue("hello", Buffer.from("hello"));

          res.status(200).json({
            data: result,
            total_data: totalItems,
            per_page: parseInt(perPage),
            current_page: parseInt(currentPage),
          });

          channel.assertQueue("hello", { durable: false });
          channel.consume("hello", (msg) => {
            console.log(msg.content.toString());
          });
        })
        .catch((err) => {});
    });
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
