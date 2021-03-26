const mongoose = require("mongoose");

mongoose.model("User", {
  nama: {
    type: "string",
    require: true,
  },
  roles: {
    type: "string",
    require: true,
  },
  email: {
    type: "string",
    require: true,
  },
  password: {
    type: "string",
    require: true,
  },
});
