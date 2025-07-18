import React from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { scroller } from 'react-scroll';

const ResponsiveMenu = ({ showMenu, toggleMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const isLoggedIn = !!localStorage.getItem("token");

  const navLinks = [
    { id: "1", name: "HOME", type: "route", link: "/" },
    { id: "2", name: "CARS", type: "internal", link: "cars" },
    { id: "3", name: "ABOUT", type: "internal", link: "about" },
    { id: "4", name: "BOOKINGS", type: "route", link: "/bookings" },
  ];

  if (role === "ADMIN") {
    navLinks.push({ id: "5", name: "ADMIN PANEL", type: "route", link: "/admin" });
  }

  const handleClick = (data) => {
    toggleMenu();

    if (data.type === "internal") {
      if (location.pathname === "/") {
        scroller.scrollTo(data.link, {
          duration: 800,
          delay: 0,
          smooth: "easeInOutQuart",
          offset: -80,
        });
      } else {
        navigate("/", { state: { scrollTo: data.link } });
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toggleMenu();
    navigate("/login");
  };

  if (!showMenu) return null;

  return (
    <div className="fixed top-0 left-0 z-50 bg-white dark:bg-gray-900 h-screen w-[75%] 
      md:hidden rounded-r-xl shadow-md flex flex-col justify-between px-8 pb-6 pt-16 transition-all duration-300">
      
      {/* User Info */}
      <div className="flex items-center gap-3">
        <FaUserCircle size={50} />
        <div>
          <p className="font-semibold text-lg">Hello {role || "Guest"}</p>
          <p className="text-sm text-gray-500">{role ? `${role} User` : "Please login"}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-12">
        <ul className="space-y-4 text-xl">
          {navLinks.map((data) => (
            <li key={data.id}>
              {data.type === "internal" ? (
                <span onClick={() => handleClick(data)} className="cursor-pointer">
                  {data.name}
                </span>
              ) : (
                <Link to={data.link} onClick={toggleMenu}>
                  {data.name}
                </Link>
              )}
            </li>
          ))}
          {isLoggedIn && (
            <li>
              <span onClick={handleLogout} className="text-red-500 cursor-pointer">
                Logout
              </span>
            </li>
          )}
        </ul>
      </nav>

      {/* Footer */}
      <div className="text-sm text-center mt-8">
        <p>
          Made with ❤️ by{" "}
          <a
            href="https://github.com/apekshas698"
            className="text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apeksha
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
