import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { useState, useEffect } from "react";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [date, setDate] = useState("");
  const [transactions, setTransactions] = useState([]);

const fetchTransactions = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "https://expense-tracker-react-sh1t.onrender.com/api/transactions",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setTransactions(res.data);

  } catch (err) {
    console.log(err);
  }
};
const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/");
  } else {
    fetchTransactions();
  }
}, [navigate]);

const addTransaction = async () => {
  if (!amount || !category || !date) {
    alert("Please fill all fields");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const newTransaction = {
      type,
      amount: Number(amount),
      category,
      date
    };

    await axios.post(
      "https://expense-tracker-react-sh1t.onrender.com/api/transactions",
      newTransaction,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchTransactions();

    setAmount("");
    setCategory("");
    setDate("");

  } catch (err) {
    console.log(err);
  }
}; 
  

const deleteTransaction = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `https://expense-tracker-react-sh1t.onrender.com/api/transactions/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchTransactions();

  } catch (err) {
    console.log(err);
  }
};

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

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userEmail");

  navigate("/");
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
   <button
      onClick={logout}
      style={{
        padding: "8px 15px",
        background: "#dc3545",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        marginBottom: "20px"
      }}
    >
      Logout
    </button>

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

 <input
  list="categories"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  placeholder="Enter Category"
  style={{
    padding: "10px",
    width: "100%",
    boxSizing: "border-box",
    borderRadius: "8px",
    border: "1px solid #ccc"
  }}
/>

<datalist id="categories">
  {type === "expense" ? (
    <>
      <option value="Food" />
      <option value="Travel" />
      <option value="Shopping" />
      <option value="Bills" />
      <option value="Petrol" />
      <option value="Movies" />
    </>
  ) : (
    <>
      <option value="Salary" />
      <option value="Business" />
      <option value="Pocket Money" />
    </>
  )}
</datalist>

      <br /><br />

<button
  onClick={addTransaction}
  style={{
    padding: "10px 20px",
    background: "#5ca6f6",
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
<hr style={{ margin: "20px 0" }} />
<h2>Category Analytics</h2>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px",
    marginTop: "10px"
  }}
>
  {Object.entries(
    filteredTransactions.reduce((acc, transaction) => {
      if (transaction.type === "expense") {
        acc[transaction.category] =
          (acc[transaction.category] || 0) +
          Number(transaction.amount);
      }

      return acc;
    }, {})
  ).map(([category, total], index) => (
    <div
      key={index}
      style={{
        padding: "10px",
        background: "#f0f0f0",
        borderRadius: "10px"
      }}
    >
      {category}: ₹{total}
    </div>
  ))}
</div>

<hr style={{ margin: "20px 0" }} />

<h2>Income Analytics</h2>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px",
    marginTop: "10px"
  }}
>
  {Object.entries(
    filteredTransactions.reduce((acc, transaction) => {
      if (transaction.type === "income") {
        acc[transaction.category] =
          (acc[transaction.category] || 0) +
          Number(transaction.amount);
      }

      return acc;
    }, {})
  ).map(([category, total], index) => (
    <div
      key={index}
      style={{
        padding: "10px",
        background: "#d4edda",
        borderRadius: "10px"
      }}
    >
      {category}: ₹{total}
    </div>
  ))}
</div>


<h2>Transactions</h2>

{filteredTransactions.map((t, index) => (
  
  <div key={index}>
    <div
  style={{
     background: darkMode ? "#2a2a2a" : "white",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
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
    onClick={() => deleteTransaction(t._id)}
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


export default Dashboard;