import Cookies from "js-cookie";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setUser } from "./store/auth.js";

function App() {
  const token = Cookies.get("token");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  async function fetchUser() {   
    setIsLoading(true);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const user = await res.json();
      dispatch(setUser(user));
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default App;
