import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import IconButton from "@mui/material/IconButton";
import dayjs from "dayjs";
import Cookies from "js-cookie";

export default function TransactionList({
  data,
  fetchTransactions,
  setEditTransaction,
  editTransaction,
}) {
  const token = Cookies.get("token");
  const user = useSelector((state) => state.auth.user);

  function categoryName(id) {
    if (!user) {
      return "Loading";
    }
    const category = user.categories.find(
      (category) => category._id === id
    );
    return category ? category.icon : "N/A";
  }

  async function remove(_id) {
    if (!window.confirm("Are you sure you want to delete this transaction?"))
      return;
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/transaction/${_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok) {
      fetchTransactions();
    }
  }

  function formatDate(date) {
    return dayjs(date).format("DD.MM.YYYY");
  }

  return (
    <>
      <Typography variant="h6">List of Transactions</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((month) =>
              month.transactions.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {row.amount} €
                  </TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="center" sx={{ fontSize: 20 }}>
                    {categoryName(row.category_id)}
                  </TableCell>
                  <TableCell align="center">{formatDate(row.date)}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="warning"
                      component="label"
                      onClick={() => setEditTransaction(row)}
                      disabled={editTransaction.amount !== undefined}
                    >
                      <EditSharpIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      component="label"
                      onClick={() => remove(row._id)}
                      disabled={editTransaction.amount !== undefined}
                    >
                      <DeleteSharpIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
