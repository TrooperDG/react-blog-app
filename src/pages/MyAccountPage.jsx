import React from "react";
import { UserAccount } from "../components";
import { useSelector } from "react-redux";

function MyAccountPage() {
  const userDetails = useSelector((state) => state.user.userDetails);
  if (userDetails)
    return (
      <div className="w-full h-screen">
        <UserAccount userDetails={userDetails} />
      </div>
    );
}

export default MyAccountPage;
