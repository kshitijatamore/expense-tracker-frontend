import { Pie } from "react-chartjs-2";
import { useState, useEffect } from "react";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [date, setDate] = useState("");
  const [transactions, setTransactions] = useState(() => {
  return JSON.parse(localStorage.getItem("transactions")) || [];
});

  const addTransaction = () => {
    if (!amount || !category || !date) {
  alert("Please fill all fields");
  return;
}
  const newTransaction = {
    type,
    amount,
    category,
     date
  };

  setTransactions((prev) => [...prev, newTransaction]);

  setAmount("");
  setCategory("");
   setDate("");
};


const deleteTransaction = (indexToDelete) => {
  const updatedTransactions = transactions.filter(
    (_, index) => index !== indexToDelete
  );

  setTransactions(updatedTransactions);
};

useEffect(() => {
  localStorage.setItem(
    "transactions",
    JSON.stringify(transactions)
  );
}, [transactions]);


const filteredTransactions =
  selectedMonth === ""
    ? transactions
    : transactions.filter(
        (t) =>
          new Date(t.date).getMonth() ===
          Number(selectedMonth)
      );

const totalIncome = filteredTransactions
  .filter((t) => t.type === "income")
  .reduce((acc, t) => acc + Number(t.amount), 0);

const totalExpense = filteredTransactions
  .filter((t) => t.type === "expense")
  .reduce((acc, t) => acc + Number(t.amount), 0);      

  const balance = totalIncome - totalExpense;

  const data = {
  labels: ["Income", "Expense"],
  datasets: [
    {
      data: [totalIncome, totalExpense],
      backgroundColor: ["green", "red"]
    }
  ]
};


  return (
   <div
  style={{
    minHeight: "100vh",
    background: darkMode ? "#121212" : "#f4f6f8",
    color: darkMode ? "white" : "black",
    padding: "40px",
    fontFamily: "Arial"
  }}
>
  <div
  style={{
    width: "90%",
    maxWidth: "500px",
    margin: "0 auto",
    background: darkMode ? "#1e1e1e" : "white",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  }}
>
      <h1>Expense Tracker 💸</h1>

      <button
  onClick={() => setDarkMode(!darkMode)}
  style={{
    padding: "8px 15px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer"
  }}
>
  Toggle Dark Mode
</button>

<select
  onChange={(e) => setSelectedMonth(e.target.value)}
  style={{
    padding: "10px",
  width: "100%",
  boxSizing: "border-box",
  borderRadius: "8px",
  marginBottom: "10px"
  }}
>
  <option value="">All Months</option>
  <option value="0">January</option>
  <option value="1">February</option>
  <option value="2">March</option>
  <option value="3">April</option>
  <option value="4">May</option>
  <option value="5">June</option>
  <option value="6">July</option>
  <option value="7">August</option>
  <option value="8">September</option>
  <option value="9">October</option>
  <option value="10">November</option>
  <option value="11">December</option>
</select>

      <select onChange={(e) => setType(e.target.value)}>
        
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <br /><br />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
         style={{
    padding: "10px",
    width: "100%",
boxSizing: "border-box",
    borderRadius: "8px",
    border: "1px solid #ccc"
  }}
      />

      <input
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
  style={{
    padding: "10px",
    width: "100%",
boxSizing: "border-box",
    borderRadius: "8px",
    border: "1px solid #ccc"
  }}
/>

      <br /><br />

  <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="">Select Category</option>

  {type === "expense" ? (
    <>
      <option value="Food">Food</option>
      <option value="Travel">Travel</option>
      <option value="Shopping">Shopping</option>
      <option value="Bills">Bills</option>
    </>
  ) : (
    <>
      <option value="Salary">Salary</option>
    </>
  )}
</select>

      <br /><br />

<button
  onClick={addTransaction}
  style={{
    padding: "10px 20px",
    background: "#7fb9f7",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }}
>
        Add Transaction</button>

<h2>Balance: ₹{balance}</h2>

<h3>Total Income: ₹{totalIncome}</h3>
<h3>Total Expense: ₹{totalExpense}</h3>


    <div
  style={{
    width: "100%",
    maxWidth: "300px",
    margin: "20px auto"
  }}
>
      <Pie data={data} />
    </div>

<h2>Transactions</h2>

{filteredTransactions.map((t, index) => (
  
  <div key={index}>
    <div
  style={{
    background: darkMode ? "#2a2a2a" : "#f8f9fa",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "10px"
  }}
>
  <h3>
    {t.type === "income" ? "💰 Income" : "💸 Expense"}
  </h3>

  <p>Amount: ₹{t.amount}</p>

  <p>Category: {t.category}</p>

  <p>
    Date:
    {" "}
    {new Date(t.date).toLocaleDateString("en-GB")}
  </p>

  <button
    onClick={() => deleteTransaction(index)}
    style={{
      padding: "5px 10px",
      background: "#dc3545",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer"
    }}
  >
    Delete
  </button>
</div>
  </div>
))}
</div>
    </div>
    
  );
}

export default App;
