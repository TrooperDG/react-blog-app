import config from "./config/config";
import { useEffect, useState } from "react";
import authService from "./appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const kipu = useSelector((state) => state.auth.userData);
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
      .catch((err) => console.log("error at authentication"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  //! tailwind not working

  return (
    <>
      <Header />
      <main>
        <h1 className="bg-slate-300 text-red-800 ">helllow</h1>
      </main>
      <Footer />
    </>
  );
}

export default App;
