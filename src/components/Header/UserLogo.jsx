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
  // const navRefMobile = useRef(null);
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

  function handleNavigate() {
    if (userData) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }

  function handleOpenUserBar() {
    if (window.innerWidth >= 768) {
      if (navRef.current.style.display == "inline-block") {
        navRef.current.style.display = "none";
      } else {
        navRef.current.style.display = "inline-block";
      }
    } else {
      navRef.current.style.right = "0px";
    }
  }
  function handleCloseUserBar() {
    navRef.current.style.right = "-12.5rem";
  }

  return (
    <div className="flex align-middle cursor-pointer relative ">
      <div className="text-white mr-2">
        <p className="text-sm font-bold">Hello!</p>
        <p
          onClick={handleNavigate}
          className="leading-4 hover:underline duration-200 "
        >
          {userName ? userName : "Sign in"}
        </p>
      </div>
      <div onClick={handleOpenUserBar} className="w-10 h-10 rounded-full ">
        {userAvatar ? (
          <img
            src={userAvatar}
            className="w-full h-full rounded-full outline-2 outline-white  object-cover"
          />
        ) : (
          <img
            src={"user.svg"}
            className="w-full h-full rounded-full   object-cover"
          />
        )}
      </div>
      {/* =============== user account ====================== */}

      {/* <ul
        ref={navRef}
        className="py-3 pb-5 absolute bg-slate-600 overflow-hidden duration-150 top-13 right-0 hidden  w-50  "
        // style={{ display: "none" }}
      >
        <li className="flex justify-end">
          <button
            onClick={handleCloseUserBar}
            className="text-white  inline-block px-4 py-2 mb-2 hover:bg-slate-500  active:bg-slate-600 "
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
      </ul> */}

      {/*=========================== for mobile view=========================*/}
      <ul
        ref={navRef}
        className="fixed inline-block  py-3 bg-slate-700 duration-150 top-0 -right-50 h-screen w-50  md:hidden md:absolute md:top-13 md:right-0 md:w-50 md:h-auto md:pb-4 md:rounded-b-lg"
        // style={{ right: "-55vw" }}
      >
        <li className="flex justify-end md:hidden">
          <button
            onClick={handleCloseUserBar}
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
