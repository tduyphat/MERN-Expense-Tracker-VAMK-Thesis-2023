import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./store/auth.js";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  console.log(auth)
  
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
