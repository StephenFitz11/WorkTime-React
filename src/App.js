import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import NavBar from "./components/navBar";
import WrappedNormalLoginForm from "./components/loginPage";
import RegisterPage from "./components/registerPage";
import LandingPage from "./components/landingPage";
import UserInterface from "./components/userInterface";
import LogOut from "./components/logout";

import auth from "./services/authService";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  // TODO: Problem: If user is logged in but navigates to /home they can't get back to app

  render() {
    return (
      <React.Fragment>
        <NavBar user={this.state.user} />
        <Switch>
          <Route path="/home" component={LandingPage} />
          <Route path="/login" component={WrappedNormalLoginForm} />
          <Route path="/logout" component={LogOut} />
          <Route path="/register" component={RegisterPage} />
          <Route
            path="/app"
            render={props => (
              <UserInterface {...props} user={this.state.user} />
            )}
          />
          <Redirect from="/" exact to="/home" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
