const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const multer = require("multer");

exports.register = async (req, res) => {
  const error = validationResult(req);
  if (!error) {
    const err = new Error("imput tidak sesusai");
    err.errorStatus = 404;
    err.data = err.data();
    throw err;
  }

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
};

exports.userLogin = async (req, res) => {
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
  res.send(token);
};

exports.userLogout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.send({ message: "logout berhasil" });
};
