import './App.css';
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link } from "react-router-dom";

import addComponent from "./components/add";
import listComponent from "./components/list";
import contactComponent from "./components/contact";
// import TutorialsList from "./components/tutorials-list.component";
class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          {/* <h1 className="navbar-brand">
            SIMPLE CRUD BTPN
          </h1> */}
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/list"} className="nav-link">
                List Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/list"]} component={listComponent} />
            <Route exact path="/add" component={addComponent} />
            <Route path="/contact/:id" component={contactComponent} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
