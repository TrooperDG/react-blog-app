import { useEffect, useState } from "react";
import authService from "./appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Footer, Header, Loading } from "./components";
import { Outlet } from "react-router-dom";
import { addUserDetails } from "./store/userSlice";
import databaseService from "./appwrite/database";

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
          databaseService.getUser(userData.$id).then((existingUser) => {
            if (existingUser) {
              dispatch(addUserDetails(existingUser));
            } else {
              databaseService
                .createUser({
                  userId: userData.$id,
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
      <Header />
      <main className="mt-16">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
