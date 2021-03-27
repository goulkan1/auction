const mongoose = require("mongoose");

const reqString = {
  type: "string",
  required: true,
};

mongoose.model("Taken", {
  idProject: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  idUser: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  specific: reqString,
  prices: {
    type: Number,
    required: true,
  },
});
