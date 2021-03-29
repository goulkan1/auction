const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("./src/models/taken");
const Taken = mongoose.model("Taken");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const auth = require("./src/controllers/auth");
const cookieParser = require("cookie-parser");
const takenRoutes = require("./src/routes/takens");
mongoose.connect(
  "mongodb+srv://dbUser:dbUser@cluster0.7so1o.mongodb.net/takens?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  console.log("konek database")
);
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/v1/taken", auth, takenRoutes);

app.listen(8003, () => {
  console.log(`Server started on port 8003`);
});
