import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../store/auth.js";
import Cookies from "js-cookie";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function _logOut() {
    Cookies.remove("token");
    dispatch(logOut());
    navigate("/login");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" className="text-white">
              Expense Tracker
            </Link>
          </Typography>
          <Button color="inherit" onClick={_logOut}>
            Logout
          </Button>
          <Link to="/login" className="text-white">
            <Button color="inherit">Login</Button>
          </Link>
          <Link to="/register" className="text-white">
            <Button color="inherit">Register</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
