import { useEffect, useState } from "react";
import authService from "./appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Footer, Header, Loading, ScrollToTop } from "./components";
import { Outlet } from "react-router-dom";
import { addUserDetails, removeUserDetails } from "./store/userSlice";
import databaseService from "./appwrite/database";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  //! have to put the getUser function in a separate function

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
          //* adding the User Details
          databaseService.getUser(userData.$id).then((existingUser) => {
            if (existingUser) {
              dispatch(addUserDetails(existingUser));
            } else {
              databaseService
                .createUser(userData.$id, {
                  userEmail: userData.email,
                  username: userData.name,
                })
                .then((userDetails) => {
                  if (userDetails) {
                    dispatch(addUserDetails(userDetails));
                  }
                });
            }
          });
        } else {
          dispatch(logout());
          dispatch(removeUserDetails());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="mt-16 bg-orange-50">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
