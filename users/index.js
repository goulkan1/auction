const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./src/models/user");
const auth = require("./src/controllers/auth");
const User = mongoose.model("User");
app.use("/img", express.static("img"));
app.use("/logo", express.static("logo"));
app.use(bodyParser.json());
app.use(cookieParser());
const userRoutes = require("./src/routes/users");
const userRegister = require("./src/routes/register");
app.use(express.json({ extended: false }));
// app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));
const multer = require("multer");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", "http://localhost:3000");
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
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

mongoose.connect(
  "mongodb+srv://dbUser:dbUser@cluster0.7so1o.mongodb.net/users?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  console.log("konek database")
);

app.use("/v1/user", auth, userRoutes);
app.use("/v1/auth", userRegister);

app.listen(8001, () => {
  console.log(`Server started on port 8001`);
});
