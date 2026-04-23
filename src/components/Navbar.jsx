import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAppContext from "../context/useAppContext.js";

function Navbar() {
  const { currentUser, logout } = useAppContext();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate("/");
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="brand" to="/" aria-label="Pawsitive Pets home">
          <img
            src="/images/logonew.png"
            alt="Pawsitive Pets"
            className="brand__logo"
          />
        </Link>

        <button
          type="button"
          className="site-nav__toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          Menu
        </button>

        <nav
          id="primary-navigation"
          className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}
        >
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `site-nav__link ${isActive ? "site-nav__link--active" : ""}`
            }
          >
            Home
          </NavLink>

          {currentUser ? (
            <>
              <NavLink
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `site-nav__link ${isActive ? "site-nav__link--active" : ""}`
                }
              >
                Profile
              </NavLink>
              <button
                type="button"
                className="button button--ghost"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `site-nav__link ${isActive ? "site-nav__link--active" : ""}`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `site-nav__link ${isActive ? "site-nav__link--active" : ""}`
                }
              >
                Create Profile
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
