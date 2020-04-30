const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connDB = require("./config/db");

connDB();
const app = express();
const transactions = require("./routes/transactions");

dotenv.config({ path: "./config/config.env" });
const Port = process.env.PORT;

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use("/api/v1/transactions", transactions);
app.listen(Port, console.log("sever running at " + Port + "port".yellow));
