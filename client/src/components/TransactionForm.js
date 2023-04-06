import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Button from "@mui/material/Button";

const InitialForm = {
  amount: 0,
  description: "",
  date: new Date(),
};

export default function TransactionForm({
  fetchTransactions,
  editTransaction,
  setEditTransaction,
}) {
  const [form, setForm] = useState(InitialForm);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (editTransaction.amount !== undefined) {
      setForm(editTransaction);
      setEditMode(true);
    } else {
      setForm(InitialForm);
      setEditMode(false);
    }
  }, [editTransaction]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleDate(newValue) {
    setForm({ ...form, date: newValue });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // editTransaction.amount === undefined ? create() : update();
    editMode ? update() : create();
  }

  function handleCancel() {
    setForm(InitialForm);
    setEditMode(false);
    setEditTransaction({});
  }

  function reload(res) {
    if (res.ok) {
      setForm(InitialForm);
      setEditMode(false);
      fetchTransactions();
    }
  }

  async function create() {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
      },
    });

    reload(res);
  }

  async function update() {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/transaction/${editTransaction._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(form),
        headers: {
          "content-type": "application/json",
        },
      }
    );

    reload(res);
  }

  return (
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Add New Transaction
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            type="number"
            sx={{ marginRight: 5 }}
            id="outlined-basic"
            label="Amount (in EUR)"
            name="amount"
            variant="outlined"
            size="small"
            value={form.amount}
            onChange={handleChange}
          />
          <TextField
            type="text"
            sx={{ marginRight: 5 }}
            id="outlined-basic"
            label="Description"
            name="description"
            variant="outlined"
            size="small"
            value={form.description}
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Transaction Date"
              inputFormat="DD.MM.YYYY"
              value={form.date}
              onChange={handleDate}
              renderInput={(params) => (
                <TextField sx={{ marginRight: 5 }} size="small" {...params} />
              )}
            />
          </LocalizationProvider>
          {/* {editTransaction.amount !== undefined && (
            <Button type="submit" variant="secondary">
              Update
            </Button>
          )}
          {editTransaction.amount === undefined && (
            <Button type="submit" variant="contained">
              Submit
            </Button>
          )} */}
          {editMode ? (
            <>
              <Button type="submit" variant="outlined">
                Update
              </Button>
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </>
          ) : (
            <Button type="submit" variant="contained">
              Submit
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
