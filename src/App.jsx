import { useEffect, useState } from "react";
import authService from "./appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import RTE from "./components/utils/RTE";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      // .catch((error) => console.log("error at authentication", error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <h1 className="bg-slate-300 text-red-800 ">helllow</h1>
        <Outlet />
        <RTE />
      </main>
      <Footer />
    </>
  );
}

export default App;
