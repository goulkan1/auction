const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./src/models/User");
const auth = require("./src/middleware/auth");
const multer = require("multer");
const { validationResult } = require("express-validator");
var path = require("path");
const User = mongoose.model("User");
app.use("/img", express.static("img"));
app.use("/logo", express.static("logo"));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.json({ extended: false }));
app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));

mongoose.connect(
  "mongodb+srv://dbUser:dbUser@cluster0.7so1o.mongodb.net/users?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  console.log("konek database")
);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "logo") {
      cb(null, "./logo/");
    } else {
      cb(null, "./img/");
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
app.use(
  multer({ storage: storage, fileFilter: fileFilter }).fields([
    {
      name: "image",
      maxCount: 1,
    },
    { name: "logo", maxCount: 1 },
  ])
);

app.post("/register", async (req, res) => {
  const error = validationResult(req);
  if (!error) {
    const err = new Error("imput tidak sesusai");
    err.errorStatus = 404;
    err.data = err.data();
    throw err;
  }

  // if (!req.file) {
  //   const err = new Error("image harus di upload");
  //   err.errorStatus = 422;
  //   throw err;
  // }

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
    image: req.files.image[0].path,
    logo: req.files.logo[0].path,
  };
  var user = new User(newUser);
  const result = await user.save();
  const { password, ...data } = await result.toJSON();
  res.send(data);
});

app.get("/users", auth, async (req, res, next) => {
  User.find()
    .then((Users) => {
      res.json(Users);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
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

  const { password, email, ...data } = await user.toJSON();
  res.send(data);
});

app.post("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.send({ message: "logout berhasil" });
});

app.listen(8001, () => {
  console.log(`Server started on port`);
});
