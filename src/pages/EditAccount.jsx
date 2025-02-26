import React from "react";
import { useSelector } from "react-redux";
import { UserForm } from "../components";
function EditAccount() {
  const userDetails = useSelector((state) => state.user.userDetails);
  if (userDetails) return <UserForm userDetails={userDetails} />;
  return <h1>loading...</h1>;
}

export default EditAccount;
