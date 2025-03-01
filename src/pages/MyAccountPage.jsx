import React from "react";
import { Container, UserAccount } from "../components";
import { useSelector } from "react-redux";

function MyAccountPage() {
  const userDetails = useSelector((state) => state.user.userDetails);
  if (userDetails)
    return (
      <Container>
        <div className="flex justify-center p-2 md:py-20">
          <div className=" w-full pt-4 max-w-2xl border border-gray-200 rounded-md  md:p-10 bg-white">
            <UserAccount userDetails={userDetails} />
          </div>
        </div>
      </Container>
    );
}

export default MyAccountPage;
