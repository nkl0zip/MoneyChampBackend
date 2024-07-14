const asyncHandler = require("express-async-handler");
const Category = require("../model/Category");
const Transaction = require("../model/Transaction");

const transactionController = {
  //add
  create: asyncHandler(async (req, res) => {
    const { type, category, amount, date, description } = req.body;
    if (!amount || !type || !date) {
      throw new Error("Type, Amount and Date are required");
    }

    //Create the transaction
    const transaction = await Transaction.create({
      user: req.user,
      type,
      category,
      amount,
      description,
    });
    res.json(transaction);
  }),

  //lists
  getFilteredTransaction: asyncHandler(async (req, res) => {
    const { startDate, endDate, type, category } = req.query;
    let filters = { user: req.user };
    if (startDate) {
      filters.date = { ...filters.date, $gte: new Date(startDate) };
    }
    if (endDate) {
      filters.date = { ...filters.date, $lte: new Date(startDate) };
    }
    if (type) {
      filters.type = type;
    }
    if (category) {
      if (category === "All") {
        //No category filtering needed for All
      } else if (category === "Uncategorized") {
        //Filter for transactions that are categorized as 'Uncategorized'
        filters.category = "Uncategorized";
      } else {
        filters.category = category;
      }
    }
    const transactions = await Transaction.find(filters).sort({ date: -1 });
    res.json(transactions);
  }),

  //Update
  update: asyncHandler(async (req, res) => {
    //Find the transaction
    const transactions = await Transaction.findById(req.params.id);
    if (transactions && transactions.user.toString() === req.user.toString()) {
      (transactions.type = req.body.type || transactions.type),
        (transactions.category = req.body.category || transactions.category),
        (transactions.amount = req.body.amount || transactions.amount),
        (transactions.date = req.body.date || transactions.date),
        (transactions.description =
          req.body.description || transactions.description);

      //update
      const updatedTransaction = await transactions.save();
      res.json(updatedTransaction);
    }
  }),

  //Delete
  delete: asyncHandler(async (req, res) => {
    //Find the transaction
    const transaction = await Transaction.findById(req.params.id);
    if (transaction && transaction.user.toString() === req.user.toString()) {
      await Transaction.findByIdAndDelete(req.params.id);
      res.json({ message: "Transaction Deleted" });
    }
  }),
};

module.exports = transactionController;
