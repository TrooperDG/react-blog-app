import React from "react";
import { Container, Logo, LogoutBtn, UserLogo } from "../index";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      path: "/",
      active: true,
    },
    {
      name: "Login",
      path: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      path: "/signup",
      active: !authStatus,
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
  ];
  return (
    <header className="py-3 shadow fixed top-0 left-0 right-0 z-20 bg-gray-700">
      <Container>
        <nav className="flex">
          <div className="mr-4  ">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.path)}
                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-200  hover:text-gray-800 rounded-full text-white"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <>
                <li>
                  <LogoutBtn />
                </li>
                <li>
                  <UserLogo />
                </li>
              </>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
