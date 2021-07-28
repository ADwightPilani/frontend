import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Redirect } from 'react-router'
import { Grid, Row, Col, Container } from "react-bootstrap";
import Navbar from "./Navbar";
const NavbarUser = (props) => {
  const [isOpen, setOpen] = useState(false);
  const [isLogout, setLogout] = useState(false);
  const isAuth = !!localStorage.getItem("token");

  const logoutUser = () => {
    // alert("logout");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setLogout(true);
    props.authenticated();
  };
  if (isLogout) {
    return (<Redirect to='/login' />);
  }
  return (
     
    <nav className="navbar is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container" >
        <div className="navbar-brand">
          <a href="#!"
            role="button"
            className={`navbar-burger burger ${isOpen && "is-active"}`}
            aria-label="menu"
            aria-expanded="false"
            onClick={() => setOpen(!isOpen)}
          >
          </a>
        </div>
        <ul>

          <li><NavLink
            className="navbar-item"
            activeClassName="is-active"
            to="/viewCompanies"
          ><a href="#!">Company Details</a>
          </NavLink></li>

          <li><NavLink
            className="navbar-item"
            activeClassName="is-active"
            to="/viewStockprices"
          ><a href="#!">Stock Prices</a>
          </NavLink></li>

          <li><NavLink
            className="navbar-item"
            activeClassName="is-active"
            to="/viewSectors"
          ><a href="#!">View Sectors</a>
          </NavLink></li>

          <li><NavLink
            className="navbar-item"
            activeClassName="is-active"
            to="/viewIPO"
          ><a href="#!">View IPO Details</a>
          </NavLink></li>

          <li><NavLink
            className="navbar-item"
            activeClassName="is-active"
            to="/comparisonCharts"
          ><a href="#!">Comparison charts</a>
          </NavLink></li>



          

        </ul>
        <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons"><a href="#!">
                <button className="button is-black" onClick={logoutUser}>
                  Log out
                </button>
              </a>
              </div>
            </div>
          </div>
      </div>
    </nav>
  );
};

export default withRouter(NavbarUser);