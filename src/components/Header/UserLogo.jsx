import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";

function UserLogo({ userAvatar = "" }) {
  const userData = useSelector((state) => state.auth.userData);
  const authStatus = useSelector((state) => state.auth.status);
  let userName = userData && userData.name;
  const navigate = useNavigate();
  if (userData && userData.name.length > 8) {
    userName = userData.name.substring(0, 6) + "...";
  }

  function handleNavigate() {
    if (userData) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }
  const navRef = useRef(null);
  const accountItems = [
    {
      name: "My Account",
      path: "/my-account",
      active: authStatus,
    },
    {
      name: "My Posts",
      path: "/my-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      path: "/add-post",
      active: authStatus,
    },
    {
      name: "Login",
      path: "/login",
      active: !authStatus,
    },
  ];

  return (
    <div className="flex align-middle cursor-pointer">
      <div className="text-white mr-2">
        <p className="text-sm font-bold">Hello!</p>
        <p
          onClick={handleNavigate}
          className="leading-4 hover:underline duration-200 "
        >
          {userName ? userName : "Sign in"}
        </p>
      </div>
      <div
        onClick={() => (navRef.current.style.right = "0vw")}
        className="w-10 h-10 rounded-full "
      >
        {userAvatar ? (
          <img
            src={"../../../public/close.svg"}
            className="w-full h-full rounded-full outline-2 outline-white  object-cover"
          />
        ) : (
          <img
            src={"../../../public/user.svg"}
            className="w-full h-full rounded-full   object-cover"
          />
        )}
      </div>
      {/* =============== user aacount ====================== */}

      <ul
        ref={navRef}
        className="fixed  py-3 bg-slate-700 duration-150 top-0 h-screen w-1/2  md:hidden"
        style={{ right: "0vw" }}
      >
        <li className="flex justify-end">
          <button
            onClick={() => (navRef.current.style.right = "-55vw")}
            className="text-white  inline-block px-4 py-2 mb-2 active:bg-slate-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="32px"
              viewBox="0 -960 960 960"
              width="32px"
              fill="#e8eaed"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
        </li>

        {accountItems.map((item) =>
          item.active ? (
            <li
              key={item.name}
              className=" duration-200 hover:bg-blue-200  hover:text-gray-800 hover:pl-0.5  text-white active:bg-blue-200 "
            >
              <button
                onClick={() => navigate(item.path)}
                className=" text-lg px-6 py-2 "
              >
                {item.name}
              </button>
            </li>
          ) : null
        )}
        {authStatus && (
          <>
            <li className=" duration-200 hover:bg-blue-200  hover:text-gray-800 hover:pl-0.5  text-white active:bg-blue-200">
              <LogoutBtn className="text-lg px-6 py-2" />
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default UserLogo;
