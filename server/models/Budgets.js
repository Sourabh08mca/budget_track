const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
  type: String,
  amount: Number,
  category: String,
  description: String,
  date: {
    type: Date,
    default: Date.now, // sets the current date by default
  }
});

const BudgetModel = mongoose.model("budgets", BudgetSchema);
module.exports = BudgetModel;
