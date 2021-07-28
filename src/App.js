import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';
import Navbar from "./Navbar";
import NavbarAdmin from "./NavbarAdmin";
import NavbarUser from "./NavbarUser";
import Data from "./Data";
import Company from "./Company";
import Stock from "./Stock";
import IPO from "./IPO";
import ManageIPO from "./ManageIPO";
import ManageSector from "./ManageSectors";
import ManageCompanies from "./ManageCompanies";
import SignUp from "./SignUp";
import Login from "./Login";
import StockExchange from "./StockExchange";
import ManageStockExchange from "./ManageStockExchange";
import Sector from "./Sector";
import ComparisonCharts from "./ComparisonCharts";
import CompStockMap from "./CompStockMap";
import ManageCompStockMap from "./ManageCompStockMap";
import ViewCompanies from "./ViewCompanies";
import ViewSectors from "./ViewSectors";
import ViewIPO from "./ViewIPO";
import StockPrices from "./StockPrices";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAdmin:false
      //totalNumberOfShares:0
    };
    this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
    this.LogIn = this.LogIn.bind(this);
    this.authenticated = this.authenticated.bind(this);
    this.setUser = this.setUser.bind(this);
  }
  LogIn = (username, password) => {
    console.log("in App username: " + username + " password: " + password);
  }
  authenticated = ()=> {
    this.setState({
      isAuthenticated:true
    })
  }
  setUser=()=>{
    this.setState({
      isAdmin:!this.state.isAdmin
    })
  }
  rerenderParentCallback() {
    this.forceUpdate();
  }

  render() {
    // alert("sessionuser is :'" +sessionStorage.getItem("user")+"'");
    // alert("token is :'" +sessionStorage.getItem("token")+"'");
    if (!!!sessionStorage.getItem("token")) {
      return (
        <BrowserRouter>
          <Navbar/>
          <div className="container mt-2" style={{ marginTop: 40 }}>
            <Switch>
              <Route path="/login">
                <Login authenticated={this.authenticated} 
                      setUser = {this.setUser}
                      rerenderParentCallback={this.rerenderParentCallback}/>
              </Route>

              <Route path="/signup">
                <SignUp />
              </Route>
            </Switch>

          </div>
        </BrowserRouter>
      );
    } else if (sessionStorage.getItem("user") == 'admin') {
      // alert("here in navbaradmin");
      return (
        <BrowserRouter>
          <NavbarAdmin authenticated={this.authenticated} 
                      setUser = {this.setUser}
                      rerenderParentCallback={this.rerenderParentCallback}/>
          <div className="container mt-2" style={{ marginTop: 40 }}>
            <Switch>
              <Route path="/addStock">
                <Stock />
              </Route>

              <Route path='/addSector'>
                <Sector />
              </Route>

              <Route path='/addCompStockMap'>
                <CompStockMap />
              </Route>

              <Route path='/manageSector'>
                <ManageSector />
              </Route>

              <Route path="/addCompany">
                <Company />
              </Route>

              <Route path="/uploadSheet">
                <Data />
              </Route>

              <Route path="/manageCompanies">
                <ManageCompanies />
              </Route>

              <Route path="/manageCompStockMap">
                <ManageCompStockMap />
              </Route>

              <Route path="/addIPO">
                <IPO />
              </Route>

              <Route path="/manageIPO">
                <ManageIPO />
              </Route>

              <Route path="/stockexchange">
                <StockExchange />
              </Route>

              <Route path="/managestockexchange">
                <ManageStockExchange />
              </Route>

              <Route path="/comparisonCharts">
                <ComparisonCharts />
              </Route>

              
            </Switch>

          </div>
        </BrowserRouter>
      );
    } else {
      // alert("user NavBar");
      return (
        <BrowserRouter>
          <NavbarUser authenticated={this.authenticated} 
                      setUser = {this.setUser}
                      rerenderParentCallback={this.rerenderParentCallback}/>
          <div className="container mt-2" style={{ marginTop: 40 }}>
            <Switch>

            <Route path="/viewStockprices">
                <StockPrices />
              </Route>

              <Route path="/comparisonCharts">
                <ComparisonCharts />
              </Route>

              <Route path="/viewCompanies">
                <ViewCompanies />
              </Route>

              <Route path="/viewIPO">
                <ViewIPO />
              </Route>

              <Route path="/viewSectors">
                <ViewSectors />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      );
    }

  }
}

export default App;