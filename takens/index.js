const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const auth = require("./src/controllers/auth");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://dbUser:dbUser@cluster0.7so1o.mongodb.net/auction?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  console.log("konek database")
);
require("./src/models/");
const takenRoutes = require("./src/routes/takens");
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
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/v1/taken", takenRoutes);

app.listen(8003, () => {
  console.log(`Server started on port 8003`);
});
