import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <h1 className="text-9xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-8 text-center">
        Oops! The page you're looking for doesn't exist.
      </p>
      <button
        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
        onClick={() => navigate("/")}
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;
