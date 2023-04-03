import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import { Container } from "@mui/material";

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    const res = await fetch("http://localhost:4000/transaction");
    const { data } = await res.json();
    setTransactions(data);
  }

  return (
    <div>
      <NavBar />
      <Container>
        <TransactionForm fetchTransactions={fetchTransactions} />
        <TransactionList transactions={transactions} />
      </Container>
    </div>
  );
}

export default App;
