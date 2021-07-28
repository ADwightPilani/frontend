import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import './Navbar.css';
import { Redirect } from 'react-router'
const Navbar = (props) => {
  const [isOpen, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const isAuth = !!localStorage.getItem("token");

  const loginUser = () => {
    console.log("hi\n");
    localStorage.setItem("token", "some-login-token");
    // history.push("/");
  };

  const logoutUser = () => {
    console.log("logout");
    localStorage.removeItem("token");
    console.log("logout isAuth "+!!localStorage.getItem("token"));
    // props.rerenderParentCallback();
    
    // history.push("/login");
  };
  // alert("tryin to render this navbar");
  console.log("above check isAuth "+!!localStorage.getItem("token"));
  console.log("rendering navbar");
  
  return (
    <nav className="navbar is-primary"
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
              to="/signup"
            ><a href="#!">Sign Up</a>
            </NavLink></li>

            <li><NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/login"
            ><a href="#!">Login</a>
            </NavLink></li>

          </div>
        </ul>

      </div>
    </nav>
  );
};

export default withRouter(Navbar);