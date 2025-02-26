import React from "react";
import { Link } from "react-router-dom";
import databaseService from "../../appwrite/database";
import Button from "../utils/Button";

export default function UserAccount({ userDetails }) {
  return (
    <div className="user-info-container px-6 py-10 md:shadow-2xl md:py-20   rounded-lg max-w-2xl mx-auto">
      {userDetails && (
        <>
          <div className="flex items-center space-x-4 mb-6">
            {userDetails.avatar ? (
              <img
                src={databaseService.getFilePreview(userDetails.avatar)}
                alt={`${userDetails.username}'s avatar`}
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <img
                src="/user.svg"
                alt={`${userDetails.username}'s avatar`}
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
              />
            )}
            <h1 className="text-3xl font-bold text-gray-800">
              {userDetails.username}
            </h1>
            <Link className="ml-auto " to="/edit-account">
              <Button>Edit</Button>
            </Link>
          </div>

          {/* Email */}
          <div className="mb-4">
            <h2 className="text-sm font-bold text-gray-600">Email</h2>
            <p className="text-lg text-gray-500 font-semibold">
              {userDetails.userEmail}
            </p>
          </div>

          {/* Address */}
          <div className="mb-4">
            <h2 className="text-sm font-bold text-gray-600">Address</h2>
            <p className="text-lg text-gray-500 font-semibold">
              {userDetails.address ? userDetails.address : "add your address"}
            </p>
          </div>

          {/* Date of Birth */}
          <div className="mb-4">
            <h2 className="text-sm font-bold text-gray-600">Date of Birth</h2>
            <p className="text-lg text-gray-500 font-semibold">
              {userDetails.DOB ? userDetails.DOB : " Add your date of birth"}
            </p>
          </div>

          {/* Bio */}
          <div className="mb-4">
            <h2 className="text-sm font-bold text-gray-600">Bio</h2>
            <p className="text-lg text-gray-500 font-semibold">
              {userDetails.bio ? userDetails.bio : "About yourself"}
            </p>
          </div>
        </>
      )}
      {/* Avatar and Username */}
    </div>
    // <h1>jsdjgf</h1>
  );
}
