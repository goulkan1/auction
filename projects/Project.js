const mongoose = require("mongoose");

mongoose.model("Project", {
  nama: {
    type: "string",
    require: true,
  },
  value: {
    type: "string",
    require: true,
  },
  require: {
    type: "string",
    require: true,
  },
  dekripsi: {
    type: "string",
    require: true,
  },
  status: {
    type: "string",
    require: true,
  },
  expires: {
    type: Date,
    require: true,
  },
  startProject: {
    type: Date,
    require: true,
  },
  endProject: {
    type: Date,
    require: true,
  },
  nMilestone: {
    type: "string",
    require: true,
  },
  kategori: {
    type: "string",
    require: true,
  },
  idUser: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
});
