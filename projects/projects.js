const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("./src/models/project");
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(bodyParser.json());
const auth = require("./src/controllers/auth");

app.use(cookieParser());
const projectRoutes = require("./src/routes/project");
app.use(cors());

mongoose.connect(
  "mongodb+srv://dbUser:dbUser@cluster0.7so1o.mongodb.net/projects?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  console.log("konek database")
);
app.use("/v1/project", auth, projectRoutes);

app.listen(8002, () => {
  console.log(`Server started on port 8002`);
});
