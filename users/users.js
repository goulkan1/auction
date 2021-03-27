const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./User");
const auth = require("./middleware/auth");
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

const User = mongoose.model("User");
mongoose.connect(
  "mongodb+srv://dbUser:dbUser@cluster0.7so1o.mongodb.net/users?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  console.log("konek database")
);

app.post("/register", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hassedPassword = await bcrypt.hash(req.body.password, salt);

  var newUser = {
    nama: req.body.nama,
    address: {
      idn: req.body.address.idn,
      provinsi: req.body.address.provinsi,
      kota: req.body.address.kota,
      kecamatan: req.body.address.kecamatan,
      kelurahan: req.body.address.kelurahan,
      alamat: req.body.address.alamat,
    },
    industri: req.body.industri,
    website: req.body.website,
    about: req.body.about,
    email: req.body.email,
    roles: req.body.roles,
    status: req.body.status,
    password: hassedPassword,
    logo: req.body.logo,
    image: req.body.image,
  };
  var user = new User(newUser);

  const result = await user.save();
  const { password, ...data } = await result.toJSON();
  res.send(data);
});

app.get("/users", auth, async (req, res, next) => {
  // const cookie = req.cookies["jwt"];
  // const claims = jwt.verify(cookie, "secret");

  // if (!claims) {
  //   return res.status(401).send({ message: "unauth " });
  // }
  User.find()
    .then((Users) => {
      res.json(Users);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
  // res.send(data);
});

app.get("/user/:id", auth, (req, res) => {
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
});

app.delete("/user/:id", auth, (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(() => {
      res.send("hapus user berhasil");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).send({ message: "email salah " });
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).send({ message: "password salah" });
  }
  const token = jwt.sign({ _id: user._id }, "secret");
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  // res.send(token);
  const { password, email, ...data } = await user.toJSON();
  res.send(data);
  //   res.send({ message: "sukses" });
});

app.post("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.send({ message: "logout berhasil" });
});

app.listen(8001, () => {
  console.log(`Server started on port`);
});
