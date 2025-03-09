import React, { useRef, useState } from "react";
import { Container, Logo, LogoutBtn, UserLogo } from "../index";
import { useSelector } from "react-redux";
import { useNavigate, Link, NavLink } from "react-router-dom";
import Sidebar from "./Sidebar";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userInfo = useSelector((state) => state.user.userDetails);

  const navRef = useRef(null);

  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      path: "/",
      active: true,
    },
    {
      name: "About",
      path: "/about",
      active: true,
    },
    {
      name: "Contact",
      path: "/contact",
      active: true,
    },

    {
      name: "Login",
      path: "/login",
      active: !authStatus,
    },
  ];
  return (
    <header className="py-3 shadow-black/30 shadow-lg fixed top-0 left-0 right-0 z-50 bg-slate-800 ">
      <Container>
        <nav className="flex mx-4 items-center">
          <div className="mr-2.5 w-10 md:hidden  pl-0">
            <button
              onClick={() => (navRef.current.style.left = "0px")}
              className="text-white active:bg-slate-600"
            >
              <svg
                className="w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                fill="#e8eaed"
              >
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
              </svg>
            </button>
          </div>

          <div className="mr-4  ">
            <Link to="/" className="flex items-center">
              <Logo width="w-8" />
              <p className="ml-2  font-semibold text-2xl">
                <span className="text-white">B</span>
                <span className="text-white">log</span>
                <span className="text-orange-500">S</span>
                <span className="text-orange-500">tore</span>
              </p>
            </Link>
          </div>

          {/*-----------------------------------------------------------*/}
          <ul className="  hidden md:flex ml-auto ">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "text-blue-300 underline underline-offset-4"
                          : "text-white"
                      } inline-block px-6 py-2 duration-200 hover:bg-blue-200  hover:text-gray-800 rounded-full  active:bg-blue-200`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn className="inline-block px-6 py-2 duration-200 hover:bg-blue-200  hover:text-gray-800 rounded-full text-white active:bg-blue-200" />
              </li>
            )}
          </ul>

          {/*for mobile view*/}
          <Sidebar navItems={navItems} navRef={navRef} />

          <div className="inline-block ml-auto ">
            <UserLogo />
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
