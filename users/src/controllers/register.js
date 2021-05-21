const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
mongoose.set("useFindAndModify", true);

const nodemailer = require("nodemailer");
const sendEmail = (email, uniqueString) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "goulkan114477@gmail.com",
      pass: "114477ewe",
    },
  });

  var mailOptions = {
    from: "goulkan114477@gmail.com",
    to: email,
    subject: "Email confirmation",
    html: `Press <a href=http://localhost:8001/v1/auth/verify/${uniqueString}>Here</a> to verify your email`,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("email sent" + info.response);
    }
  });
};
const randString = () => {
  const len = 8;
  let randStr = "";
  for (let i = 0; i < len; i++) {
    const ch = Math.floor(Math.random() * 10 + 1);
    randStr += ch;
  }
  console.log(randStr);
  return randStr;
};
exports.register = async (req, res, next) => {
  try {
    const uniqueString = randString();

    const salt = await bcrypt.genSalt(10);
    const hassedPassword = await bcrypt.hash(req.body.password, salt);
    const error = await validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({ error: error.array() });
    }
    const email = req.body.email;
    var newUser = {
      nama: req.body.nama,
      email: req.body.email,
      password: hassedPassword,
      uniqueString: uniqueString,
    };
    var user = new User(newUser);
    const result = await user.save();
    sendEmail(email, uniqueString);

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
exports.verify = async (req, res) => {
  const options = {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
    useFindAndModify: false,
  };
  const { uniqueString } = req.params;
  console.log(uniqueString);
  const user = await User.findOne({ uniqueString: uniqueString });
  if (user) {
    var updateUser = {
      status: "verify",
    };
    result = await User.findOneAndUpdate(
      { uniqueString: uniqueString },
      updateUser,
      options
    );
    const { ...data } = await result.toJSON();
    res.status(200).send("email is verified");
  } else {
    res.json(`user not found`);
  }
};
