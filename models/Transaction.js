const mongoose = require("mongoose");

const TansactionShema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: [true, "Please add some Text"],
  },
  amount: {
    type: Number,
    required: [true, "Please add a number"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transaction", TansactionShema);
