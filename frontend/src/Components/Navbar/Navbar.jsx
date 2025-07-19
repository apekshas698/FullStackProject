import React, { useState, useEffect } from "react";
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";
import ResponsiveMenu from "./ResponsiveMenu.jsx";

const Navbar = ({ theme, setTheme }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
    setRole(localStorage.getItem("role"));
  }, [location]);

  const toggleMenu = () => setShowMenu(!showMenu);

  const handleNavClick = (data) => {
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
    setIsLoggedIn(false);
    setRole(null);
    navigate("/login");
  };

  const navLinks = [
    { id: "1", name: "HOME", type: "route", link: "/" },
    { id: "2", name: "CARS", type: "internal", link: "cars" },
    { id: "3", name: "ABOUT", type: "internal", link: "about" },
    { id: "4", name: "BOOKINGS", type: "route", link: "/bookings" },
  ];

  if (role === "ADMIN") {
    navLinks.push({ id: "5", name: "ADMIN PANEL", type: "route", link: "/admin" });
  }

  return (
    <nav className="shadow-md bg-white dark:bg-dark dark:text-white duration-300 relative z-40">
      <div className="container py-3 md:py-0">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold font-serif pb-6">CAR RENTAL</h1>

          {/* Nav Links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((data) => (
              <li key={data.id} className="py-4">
                {data.type === "internal" ? (
                  <span
                    onClick={() => handleNavClick(data)}
                    className="inline-block py-2 cursor-pointer hover:border-b-2 hover:text-primary hover:border-primary transition-colors duration-500 text-lg font-medium"
                  >
                    {data.name}
                  </span>
                ) : (
                  <Link
                    to={data.link}
                    className="inline-block py-2 hover:border-b-2 hover:text-primary hover:border-primary transition-colors duration-500 text-lg font-medium"
                  >
                    {data.name}
                  </Link>
                )}
              </li>
            ))}

            {/* Auth Buttons */}
            <li className="py-4">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:underline text-lg font-medium"
                >
                  Logout
                </button>
              ) : null}
            </li>
          </ul>

          {/* Theme + Menu Toggle */}
          <div className="flex items-center gap-4 md:gap-6">
            {theme === "dark" ? (
              <BiSolidSun onClick={() => setTheme("light")} className="text-2xl cursor-pointer" />
            ) : (
              <BiSolidMoon onClick={() => setTheme("dark")} className="text-2xl cursor-pointer" />
            )}
            {showMenu ? (
              <HiMenuAlt1 onClick={toggleMenu} size={30} className="cursor-pointer md:hidden" />
            ) : (
              <HiMenuAlt3 onClick={toggleMenu} size={30} className="cursor-pointer md:hidden" />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <ResponsiveMenu showMenu={showMenu} toggleMenu={toggleMenu} />
    </nav>
  );
};

export default Navbar;
