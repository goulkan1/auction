const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
mongoose.set("useFindAndModify", true);

exports.register = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hassedPassword = await bcrypt.hash(req.body.password, salt);
    const error = await validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({ error: error.array() });
    }
    var newUser = {
      nama: req.body.nama,
      email: req.body.email,
      password: hassedPassword,
    };
    var user = new User(newUser);
    const result = await user.save();
    const { password, ...data } = await result.toJSON();
    res
      .status(201)
      .json({ register: data, message: "data user berhasil di tambahkan" });
  } catch (error) {
    return res.status(422).json({ message: "Tidak Boleh Kosong" });
  }
};

exports.userLogin = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).send({ message: "Unauthorized " });
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  const token = jwt.sign(
    { _id: user._id, name: user.nama, roles: user.roles },
    "secret"
  );

  res
    .status(200)
    .cookie("jwt", token, {
      // secure: true,
      path: "/",
      sameSite: "none",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    })
    .json({ login: user, message: "login berhasil" });
};

exports.userLogout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.send({ message: "logout berhasil" });
};

exports.updateUser = async (req, res) => {
  const options = { new: true, upsert: true, setDefaultsOnInsert: true };
  const id = req.params.id;
  const error = validationResult(req);
  if (!error) {
    const err = new Error("file tidak sesusai");
    err.errorStatus = 404;
    err.data = err.data();
    throw err;
  }
  const salt = await bcrypt.genSalt(10);
  const hassedPassword = await bcrypt.hash(req.body.password, salt);

  var updateUser = {
    nama: req.body.nama,
    password: hassedPassword,
    email: req.body.email,
    phone: req.body.phone,
    dob: req.body.dob,
    address: req.body.address,
    gender: req.body.gender,
    website: req.body.website,
    about: req.body.about,
    roles: req.body.roles,
    status: req.body.status,
    image: req.files.image[0].path,
  };
  result = await User.findOneAndUpdate({ _id: id }, updateUser, options);
  const { password, ...data } = await result.toJSON();
  res.status(200).send(data);
};
