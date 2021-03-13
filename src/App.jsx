import React, { Component } from 'react';
import { BrowserRouter, Route, Router, Link, Switch } from "react-router-dom"
import Home from './Home.jsx';
import Login from './login.jsx';
import Signup from './signup.jsx'
import Friendsliste from './friends-liste.jsx'
import Application2 from './application2'
import withAuth from './withAuth'
import Chat from './components/chat.jsx'

class App extends Component {
  // différente route renvoyant un composant react
  render() {
    return (
    <BrowserRouter>
      <div>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            {/*withAuth permet de renvoyer le composant "Application" si la vérification des cookies est validé par le server*/}
            <Route path="/app/friendlist" component={withAuth(Friendsliste)} />
            <Route path="/app2/:id" component={withAuth(Application2)}/>
        </Switch>
        </div>
    </BrowserRouter>
    );
  }
}

export default App;