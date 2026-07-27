import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { MdMenu, MdClose } from "react-icons/md";

import Profile from "./Profile.jsx";
import Search from "./Search.jsx";

const Navbar = ({ search, setSearch }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateAuth = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", updateAuth);

    return () => {
      window.removeEventListener("storage", updateAuth);
    };
  }, []);

  return (
    <nav
      className="
  sticky
  top-0
  z-50
  bg-white
  border-b
  border-sky-100
  shadow-sm
  "
    >
      <div
        className="
  max-w-7xl
  mx-auto
  px-5
  sm:px-8
  py-4
  flex
  items-center
  justify-between
  gap-8
  "
      >
        {/* LOGO */}

        <Link
          to={token ? "/dashboard" : "/login"}
          className="
          text-2xl
          font-bold
          bg-linear-to-r
          from-sky-500
          to-blue-600
          bg-clip-text
          text-transparent
          "
        >
          MK Todo-List
        </Link>

        {/* DESKTOP */}
        <div className="hidden lg:flex flex-1 items-center justify-end">
          {/* Search */}
          {token && (
            <div className="mx-12 w-80">
              <Search
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClearSearch={() => setSearch("")}
              />
            </div>
          )}

          {/* Right Side */}
          <div className="flex items-center gap-8">
            {token && (
              <Link
                to="/dashboard"
                className="
          font-medium
          text-slate-700
          hover:text-sky-500
          transition
        "
              >
                Dashboard
              </Link>
            )}

            {!token && (
              <>
                <Link
                  to="/signup"
                  className="
            px-5
            py-2.5
            rounded-xl
            border
            border-sky-200
            text-sky-600
            font-semibold
            hover:bg-sky-50
            transition
          "
                >
                  Sign up
                </Link>

                <Link
                  to="/login"
                  className="
            px-5
            py-2.5
            rounded-xl
            bg-linear-to-r
            from-sky-500
            to-blue-600
            text-white
            font-semibold
            shadow-md
            shadow-sky-200
            hover:scale-105
            hover:shadow-lg
            transition-all
          "
                >
                  Login
                </Link>
              </>
            )}

            {token && <Profile />}
          </div>
        </div>

        {/* MOBILE BUTTON */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="
          lg:hidden
          text-3xl
          text-sky-600
          "
        >
          {menuOpen ? <MdClose /> : <MdMenu />}
        </button>
      </div>

      {/* MOBILE MENU */}

      {menuOpen && (
        <div
          className="
            lg:hidden
            mt-5
            bg-white
            border
            border-sky-100
            rounded-2xl
            shadow-lg
            p-5
            flex
            flex-col
            gap-4
            "
        >
          {token && (
            <>
              <Link
                onClick={() => setMenuOpen(false)}
                to="/dashboard"
                className="
                    font-semibold
                    text-slate-700
                    hover:text-sky-500
                    "
              >
                Dashboard
              </Link>

              <Search
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClearSearch={() => setSearch("")}
              />

              <Profile />
            </>
          )}

          {!token && (
            <>
              <Link
                onClick={() => setMenuOpen(false)}
                to="/signup"
                className="
                    w-full
                    text-center
                    px-5
                    py-3
                    rounded-xl
                    border
                    border-sky-200
                    text-sky-600
                    font-semibold
                    hover:bg-sky-50
                    "
              >
                Create Account
              </Link>

              <Link
                onClick={() => setMenuOpen(false)}
                to="/login"
                className="
                    w-full
                    text-center
                    px-5
                    py-3
                    rounded-xl
                    bg-linear-to-r
                    from-sky-500
                    to-blue-600
                    text-white
                    font-semibold
                    shadow-md
                    "
              >
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
