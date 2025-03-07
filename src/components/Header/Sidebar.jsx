import React, { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

function Sidebar({ navItems = [], navRef }) {
  function handleCloseSidebar() {
    navRef.current.style.left = "-12.5rem";
  }
  function clickOutside(event) {
    if (navRef.current && !navRef.current.contains(event.target)) {
      handleCloseSidebar(); // Close sidebar when clicking outside
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, []);

  return (
    <ul
      ref={navRef}
      className="fixed  pt-3 pb-5 rounded-br-lg bg-slate-800 duration-150 top-0  w-40 -left-50 md:hidden"
      // style={{ left: "-55vw" }}
    >
      <li className="border-b border-gray-400">
        <button
          onClick={handleCloseSidebar}
          className="text-white inline-block px-4 py-1.5 mb-2 active:bg-slate-600"
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

      {navItems.map((item) =>
        item.active ? (
          <li
            // onClick={() => {
            //   handleCloseSidebar();
            //   navigate(item.path);
            // }}
            key={item.name}
            // className=" duration-200 border-b-2 border-slate-800 hover:bg-slate-700  hover:border-gray-400 hover:pl-0.5  text-white active:bg-blue-200"
          >
            <NavLink
              to={item.path}
              onClick={handleCloseSidebar}
              className={({ isActive }) =>
                ` inline-block w-full duration-200 border-b-2  hover:bg-slate-700  hover:border-gray-400 hover:pl-0.5  text-white active:bg-blue-200 ${
                  isActive
                    ? "border-gray-400 bg-slate-700  "
                    : "border-slate-800"
                } `
              }
            >
              <button className=" text-lg px-6 py-2 ">{item.name}</button>
            </NavLink>
          </li>
        ) : null
      )}
    </ul>
  );
}

export default Sidebar;
