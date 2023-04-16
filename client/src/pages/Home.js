import React from "react";
import { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import Cookies from "js-cookie";
import TransactionChart from "../components/TransactionChart";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    const token = Cookies.get("token");
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = await res.json();
    setTransactions(data);
  }

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TransactionForm
            fetchTransactions={fetchTransactions}
            editTransaction={editTransaction}
            setEditTransaction={setEditTransaction}
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <TransactionList
            data={transactions}
            fetchTransactions={fetchTransactions}
            setEditTransaction={setEditTransaction}
            editTransaction={editTransaction}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <TransactionChart data={transactions} />
        </Grid>
      </Grid>
    </Container>
  );
}


