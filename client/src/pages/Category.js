import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { Container, Typography } from "@mui/material";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import IconButton from "@mui/material/IconButton";
import dayjs from "dayjs";

export default function Category() {
  const user = useSelector((state) => state.auth.user);

  function categoryName(id) {
    if (!user || !user.categories) {
      return "Loading";
    }
    const category = user.categories.find((category) => category._id === id);
    return category ? category.label : "N/A";
  }

  function formatDate(date) {
    return dayjs(date).format("DD.MM.YYYY");
  }

  // function remove(id) {
  //   const res = await fetch(`${process.env.REACT_APP_API_URL}/category`)
  // }

  return (
    <Container>
      <Typography variant="h6" sx={{ marginTop: 10 }}>
        List of Categories
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Label</TableCell>
              <TableCell align="center">Icon</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.categories.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {row.label}
                </TableCell>
                <TableCell align="center">{row.icon}</TableCell>

                <TableCell align="center">
                  <IconButton
                    color="primary"
                    component="label"
                    // onClick={() => setEditTransaction(row)}
                  >
                    <EditSharpIcon />
                  </IconButton>
                  <IconButton
                    color="warning"
                    component="label"
                    // onClick={() => remove(row._id)}
                  >
                    <DeleteSharpIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
