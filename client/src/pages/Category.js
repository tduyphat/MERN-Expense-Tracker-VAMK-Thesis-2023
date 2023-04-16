import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import { Container, Typography } from "@mui/material";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import IconButton from "@mui/material/IconButton";
import Cookies from "js-cookie";
import { setUser } from "../store/auth";
import CategoryForm from "../components/CategoryForm";
import { useState } from "react";

export default function Category() {
  const token = Cookies.get("token");

  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch();
  const [editCategory, setEditCategory] = useState({});

  function setEdit(category) {
    setEditCategory(category);
  }

  async function remove(id) {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/category/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const _user = {
        ...user,
        categories: user.categories.filter((cat) => cat._id != id),
      };
      dispatch(setUser({ user: _user }));
    }
  }

  return (
    <Container>
      <CategoryForm
        editCategory={editCategory}
        setEditCategory={setEditCategory}
      />
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
                    color="warning"
                    component="label"
                    onClick={() => setEdit(row)}
                    disabled={editCategory.label !== undefined}
                  >
                    <EditSharpIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    component="label"
                    onClick={() => remove(row._id)}
                    disabled={editCategory.label !== undefined}
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
