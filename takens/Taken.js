const mongoose = require("mongoose");

mongoose.model("Taken", {
  idProject: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  idUser: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  specific: {
    type: "string",
    required: true,
  },
  prices: {
    type: Number,
    required: true,
  },
});
