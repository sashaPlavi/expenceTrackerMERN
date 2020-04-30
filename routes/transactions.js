const express = require("express");
const router = express.Router();
const {
  Transactions,
  addTransactions,
  deleteTransactions,
} = require("../controller/transactions");

router.route("/").get(Transactions).post(addTransactions);

router.route("/:id").delete(deleteTransactions);

module.exports = router;
