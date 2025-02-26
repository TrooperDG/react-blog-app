import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { removeUserDetails } from "../../store/userSlice";

function LogoutBtn({ className = "" }) {
  const dispatch = useDispatch();
  function logoutHandler() {
    authService.logout().then(() => {
      dispatch(logout());
      dispatch(removeUserDetails());
    });
  }
  return (
    <button onClick={logoutHandler} className={className}>
      Logout
    </button>
  );
}

export default LogoutBtn;
