const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },

    redirectURL: {
      type: String,
      required: true,
    },

    visitHistory: [
      {
        timestamp: { type: Number },
      },
    ],
  },
  // this ensures that we get the time of creation for any entry
  { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
