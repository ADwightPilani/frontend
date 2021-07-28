import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import './Navbar.css';
import { Redirect } from 'react-router'
const NavbarAdmin = (props) => {
  const [isOpen, setOpen] = useState(false);
  const [isLogout, setLogout] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const isAuth = !!localStorage.getItem("token");

  const logoutUser = () => {
    // alert("logout");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setLogout(true);
    props.authenticated();
    // history.push("/login");
  };
  if(isLogout){
    // alert("Logout: "+isLogout);
    
    // setLogout(false);
    return (<Redirect to='/login'/>);
  }

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
              to="/addStock"
            ><a href="#!">Add Stock</a>
            </NavLink></li>

            <li><NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/addCompStockMap"
            ><a href="#!">Add CompStockMap</a>
            </NavLink></li>

            <li><NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/manageCompStockMap"
            ><a href="#!">View CompStockMap</a>
            </NavLink></li>

            <li><NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/addSector"
            ><a href="#!">Add Sector</a>
            </NavLink></li>

            <li><NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/manageSector"
            ><a href="#!">View Sectors</a>
            </NavLink></li>

            <li><NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/addCompany"
            ><a href="#!">Add Company</a>
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
              to="/addIPO"
            ><a href="#!">Add IPO</a>
            </NavLink></li>

            <li><NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/manageIPO"
            ><a href="#!">Manage IPO</a>
            </NavLink></li>

            <li><NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/stockexchange"
            ><a href="#!">Add Exchange</a>
            </NavLink></li>

            <li><NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/comparisonCharts"
            ><a href="#!">Comparison Charts</a>
            </NavLink></li>

            <li><NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/managestockexchange"
            ><a href="#!">View Exchanges</a>
            </NavLink></li>

          </div>


          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons"><li><a href="#!">
                  <button className="button is-black" onClick={logoutUser}>
                    Log out
                  </button>
                </a></li>
              </div>
            </div>
          </div>

        </ul>

      </div>
    </nav>
  );
};

export default withRouter(NavbarAdmin);