import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';
import Navbar from "./Navbar";
import Data from "./Data";
import Company from "./Company";
import ManageCompanies from "./ManageCompanies";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mt-2" style={{ marginTop: 40 }}>
        <Switch>
          <Route path="/addCompany">
            <Company />
          </Route>
          <Route path="/uploadSheet">
            <Data />
          </Route>
          <Route path="/manageCompanies">
            <ManageCompanies />
          </Route>
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;