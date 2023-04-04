import React from "react";
import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    const res = await fetch("http://localhost:4000/transaction");
    const { data } = await res.json();
    setTransactions(data);
  }
  return (
    <Container>
      <TransactionForm
        fetchTransactions={fetchTransactions}
        editTransaction={editTransaction}
        setEditTransaction={setEditTransaction}
      />
      <TransactionList
        transactions={transactions}
        fetchTransactions={fetchTransactions}
        setEditTransaction={setEditTransaction}
      />
    </Container>
  );
}
