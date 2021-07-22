import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import './Navbar.css';
const Navbar = ({ history }) => {
  const [isOpen, setOpen] = useState(false);

  const isAuth = !!localStorage.getItem("token");

  const loginUser = () => {
    console.log("hi\n");
    localStorage.setItem("token", "some-login-token");
    history.push("/profile/Vijit");
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <nav
      className="navbar is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <a href="#!"
            role="button"
            className={`navbar-burger burger ${isOpen && "is-active"}`}
            aria-label="menu"
            aria-expanded="false"
            onClick={() => setOpen(!isOpen)}
          >
            {/* <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span> */}
          </a>
        </div>
            <ul>
        <div className={`navbar-menu ${isOpen && "is-active"}`}>
            <li><NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/uploadSheet"
            ><a href="#!">Import Data</a>
            </NavLink></li>
            
            <li><NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/addCompany"
            ><a href="#!">Create Company</a>
            </NavLink></li>

            <li><NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/manageCompanies"
            ><a href="#!">Manage Companies</a>
            </NavLink></li>

            <li><NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/addExchange"
            ><a href="#!">Manage Exchange</a>
            </NavLink></li>

            <li><NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/addIPO"
            ><a href="#!">Update IPO deatils</a>
            </NavLink></li>

          </div>

            
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons"><li><a href="#!">
                {!isAuth ? (
                  <button className="button is-white" onClick={loginUser}>
                    Log in
                  </button>
                ) : (
                  <button className="button is-black" onClick={logoutUser}>
                    Log out
                  </button>
                )}</a></li>
              </div>
            </div>
          </div>
          
          </ul>
          
      </div>
    </nav>
  );
};

export default withRouter(Navbar);