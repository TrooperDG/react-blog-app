import React from "react";
import { useSelector } from "react-redux";

function UserLogo() {
  const userData = useSelector((state) => state.auth.userData);
  return (
    <button className="inline-block px-6 py-2 duration-75 text-white  hover:outline-2 hover:outline-blue-100   rounded-full">
      Hello! {userData.name}
    </button>
  );
}

export default UserLogo;
