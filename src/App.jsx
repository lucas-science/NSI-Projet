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
        <div className="nav-barre" id="nav-barre">
            <div className="logo-parti">
                <img className="logo" id="logo1" alt="logo" src="image/logo-ichat.png" alt="logo ichat"/>
            </div>
            <div class="bouton-parti ">
                <a id="link1"><Link to="/app">Application</Link></a>
                <a id="link2" ><Link to="/signup">Signin</Link></a>
                <a id="link3"><Link to="/login">Login</Link></a>
            </div>
        </div>
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