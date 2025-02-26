import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar({ navItems = [], navRef }) {
  // const navRef = useRef(null);
  const navigate = useNavigate();

  return (
    <ul
      ref={navRef}
      className="fixed  py-3 bg-slate-700 duration-150 top-0 h-screen w-50 -left-50 md:hidden"
      // style={{ left: "-55vw" }}
    >
      <li>
        <button
          onClick={() => (navRef.current.style.left = "-12.5rem")}
          className="text-white inline-block px-4 py-2 mb-2 active:bg-slate-600"
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
            key={item.name}
            className=" duration-200 hover:bg-blue-200  hover:text-gray-800 hover:pl-0.5  text-white active:bg-blue-200"
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
      {/* {authStatus && (
              <>
                <li className=" duration-200 hover:bg-blue-200  hover:text-gray-800  text-white active:bg-blue-200">
                  <LogoutBtn className="text-lg px-6 py-2" />
                </li>
              </>
            )} */}
    </ul>
  );
}

export default Sidebar;
