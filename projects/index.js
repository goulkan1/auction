const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const redis = require("redis");
require("./src/models/project");
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(bodyParser.json());
const auth = require("./src/controllers/auth");

app.use(cookieParser());
const projectRoutes = require("./src/routes/project");
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

mongoose.connect(
  // "mongodb+srv://dbUser:dbUser@cluster0.7so1o.mongodb.net/auction?retryWrites=true&w=majority",
  "mongodb+srv://dbUser:dbUser@cluster0.7so1o.mongodb.net/auction?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  console.log("konek database")
);
app.use("/v1/project", projectRoutes);

app.listen(8002, () => {
  console.log(`Server started on port 8002`);
});

const redisPort = 6379;
const client = redis.createClient(redisPort);
client.on("error", (err) => {
  console.log(err);
});
