import React, { Component } from 'react';
import { BrowserRouter, Route, Router, Link, Switch } from "react-router-dom"
import Home from './Home.jsx';
import Login from './login.jsx';
import Signup from './signup.jsx'
import Application from './application.jsx'
import withAuth from './withAuth'

class App extends Component {
  render() {
    return (
    <BrowserRouter>
      <div>

        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/app" component={withAuth(Application)} />
        </Switch>
        </div>
    </BrowserRouter>
    );
  }
}

export default App;