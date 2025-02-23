import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn({ className = "" }) {
  const dispatch = useDispatch();
  function logoutHandler() {
    authService.logout().then(() => {
      dispatch(logout());
    });
  }
  return (
    <button onClick={logoutHandler} className={className}>
      Logout
    </button>
  );
}

export default LogoutBtn;
