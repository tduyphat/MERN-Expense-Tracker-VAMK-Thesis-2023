import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../store/auth.js";
import Cookies from "js-cookie";

export default function NavBar() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  function _logOut() {
    Cookies.remove("token");
    dispatch(logOut());
    navigate("/login");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ backgroundColor: "green" }} position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" className="text-white">
              SpendSmartly!
            </Link>
          </Typography>
          {user && isAuthenticated && (
            <Typography sx={{ marginRight: 2 }}>
              <i>{user.firstName} logged in </i>
            </Typography>
          )}
          {isAuthenticated && (
            <Link to="/category" className="text-white">
              <Button color="inherit">Category</Button>
            </Link>
          )}
          {isAuthenticated && (
            <IconButton color="inherit" component="label" onClick={_logOut}>
              <LogoutIcon />
            </IconButton>
          )}
          {!isAuthenticated && (
            <>
              <Link to="/login" className="text-white">
                <Button color="inherit">Login</Button>
              </Link>
              <Link to="/register" className="text-white">
                <Button color="inherit">Register</Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
