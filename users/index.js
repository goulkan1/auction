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
const userRoutes = require("./src/routes/users");
const userRegister = require("./src/routes/register");
const multer = require("multer");
app.use(express.json());
const { validationResult } = require("express-validator");
app.options("*");
app.use(cookieParser());
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("./apidocs.json");

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc));

app.use(
  cors({
    origin: [
      // "http://127.0.0.1:3000",
      "http://localhost:3000",
      // "http://167.71.171.235:8001",
    ],
    credentials: true,
  })
);

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
  // "mongodb+srv://dbUser:dbUser@cluster0.7so1o.mongodb.net/users?retryWrites=true&w=majority",
  "mongodb+srv://public:z4ZM6lKTyhHOY7pe@cluster0.llm7c.mongodb.net/service1?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  console.log("konek database")
);

app.use("/v1/user", userRoutes);
app.use("/v1/auth", userRegister);

app.listen(8001, () => {
  console.log(`Server started on port 8001`);
});
