const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("./Taken");
const Taken = mongoose.model("Taken");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const cookieParser = require("cookie-parser");

mongoose.connect(
  "mongodb+srv://dbUser:dbUser@cluster0.7so1o.mongodb.net/takens?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  console.log("konek database")
);

app.use(bodyParser.json());
app.use(cookieParser());

app.post("/taken", auth, async (req, res) => {
  var newTakens = {
    idProject: mongoose.Types.ObjectId(req.body.idProject),
    idUser: mongoose.Types.ObjectId(req.body.idUser),
    specific: req.body.specific,
    prices: parseInt(req.body.prices),
  };
  var taken = new Taken(newTakens);
  const result = await taken.save();
  const { ...data } = await result.toJSON();
  res.send(data);
});

app.get("/takens", auth, (req, res) => {
  Taken.find()
    .then((takens) => {
      res.json(takens);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.get("/taken/:id", auth, (req, res) => {
  Taken.findById(req.params.id)
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
});

app.delete("/taken/:id", auth, (req, res) => {
  Taken.findByIdAndRemove(req.params.id)
    .then((taken) => {
      res.send("project takens berhasil di hapus");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.listen(8003, () => {
  console.log(`Server started on port 8003`);
});
