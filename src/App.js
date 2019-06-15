import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import NavBar from "./components/navBar";
import "./App.css";
import WrappedNormalLoginForm from "./components/loginPage";
import RegisterPage from "./components/registerPage";
import LandingPage from "./components/landingPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <NavBar user={this.state.user} />
        <Switch>
          <Route path="/home" component={LandingPage} />
          <Route path="/login" component={WrappedNormalLoginForm} />
          <Route path="/register" component={RegisterPage} />
          <Redirect from="/" exact to="/home" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
