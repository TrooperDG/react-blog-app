import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import databaseService from "../../appwrite/database";

function UserLogo() {
  const userDetails = useSelector((state) => state.user.userDetails);
  const authStatus = useSelector((state) => state.auth.status);

  let userName = "User";
  const navigate = useNavigate();
  if (userDetails) {
    if (userDetails.username) {
      userDetails.username.length > 10
        ? (userName = userDetails.username.substring(0, 8) + "...")
        : (userName = userDetails.username);
    }
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
    if (userDetails) {
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
        {userDetails && userDetails.avatar ? (
          <img
            src={databaseService.getFilePreview(userDetails.avatar)}
            className="w-full h-full rounded-full outline-2 outline-white  object-cover"
          />
        ) : (
          <svg
            className=" w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
          </svg>
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
