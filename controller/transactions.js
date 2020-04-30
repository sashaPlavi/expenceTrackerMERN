const Transaction = require("../models/Transaction");

//decs get all transaction
//route GET /api/v1/transactions
//access Public

exports.Transactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    return res.status(200).json({
      sucess: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    res.staus(500).json({
      sucess: false,
      error: "Server error",
    });
  }
};

//decs add transaction
//route POST /api/v1/transactions
//access Public

exports.addTransactions = async (req, res, next) => {
  try {
    const { text, amount } = req.body;
    const transactions = await Transaction.create(req.body);

    return res.status(201).json({
      sucess: true,
      data: transactions,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((val) => val.message);
      res.status(400).json({
        sucess: false,
        data: message,
      });
    } else {
      res.staus(500).json({
        sucess: false,
        error: "Server error",
      });
    }
  }
};

//decs delete transaction
//route GET /api/v1/transactions/:id
//access Public

exports.deleteTransactions = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      res.status(404).json({
        sucess: false,
        error: "No transaction found",
      });
    }
    await transaction.remove();
    res.status(200).json({
      sucess: true,
      message: "deleted",
    });
  } catch (error) {
    console.log(error);
    res.staus(500).json({
      sucess: false,
      error: "Server error",
    });
  }
};

//decs get all transaction
//route GET /api/v1/transactions
//access Public
