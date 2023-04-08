import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function CheckAuth({ children }) {
  const token = Cookies.get("token");

  return token ? children : <Navigate to="/login" replace={true} />;
}
