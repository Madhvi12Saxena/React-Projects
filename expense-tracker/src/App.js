import React, { useState, useEffect } from 'react';
import './App.css';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('groceries');

  useEffect(() => {
    // Fetch expenses from local storage on component mount
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(storedExpenses);
  }, []);

  useEffect(() => {
    // Update local storage whenever expenses change
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = () => {
    if (!amount) return;

    const newExpense = {
      id: Date.now(),
      amount: parseFloat(amount),
      category,
    };

    setExpenses([...expenses, newExpense]);
    setAmount('');
  };

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  const categoryWiseExpenses = expenses.reduce((categoryTotal, expense) => {
    if (!categoryTotal[expense.category]) {
      categoryTotal[expense.category] = 0;
    }
    categoryTotal[expense.category] += expense.amount;
    return categoryTotal;
  }, {});

  return (
    <div>
      <h1>Expense Tracker</h1>

      <label htmlFor="amount">Amount:</label>
      <input
        type="number"
        id="amount"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <label htmlFor="category">Category:</label>
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="groceries">Groceries</option>
        <option value="entertainment">Entertainment</option>
        <option value="utilities">Utilities</option>
        {/* Add more categories as needed */}
      </select>

      <button onClick={addExpense}>Add Expense</button>

      <h2>Expense Summary</h2>
      <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>

      <h3>Category-wise Spending</h3>
      <ul>
        {Object.keys(categoryWiseExpenses).map((category) => (
          <li key={category}>{category}: ${categoryWiseExpenses[category].toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseTracker;
