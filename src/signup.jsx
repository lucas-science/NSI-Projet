import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Router, Link, Switch } from "react-router-dom"

export default class signup extends Component {
    // création des states suivant
    constructor(props) {
      super(props)
      this.state = {
        email : '',
        mdp: '',
        pseudo:'',
        message:''
      };
    }
    // ajout des changement lorsque le texte de l'input change
    handleInputChange = (event) => {
      const { value, name } = event.target;
      this.setState({
        [name]: value
      });
    }
    // quand bouton submit pressé, envoyé une requête POST au serveur pour insérer le nouvel utilisateur dans la base de donnée
    onSubmit = (event) => {
      event.preventDefault();
      console.log("state signup : ",this.state);

      fetch('http://localhost:4000/authentification/signup', {
        method: 'POST',
        // credentials : include permet d'intégrer les cookie avec la requête
        credentials: 'include',
        body: JSON.stringify({
          pseudo:this.state.pseudo,
          email:this.state.email,
          mdp:this.state.mdp
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((value) => {
        if (value.status === 200) {
          // s'il y a eu aucune erreur redirigé à l'acceuil
          this.props.history.push('/');
          console.log("info envoyé");
        } else {
          // s'il y a eu une erreur, renvoyer le message suivant
          this.setState({message:'Pseudo ou email déjà utilisé'});
        }
      })

    }
  
    render() {
      return (
        <div>
          <div className="nav-barre" id="nav-barre">
            <div className="logo-parti">
                <img className="logo" id="logo1" alt="logo" src="image/logo-ichat.png" alt="logo ichat"/>
            </div>
            <div class="bouton-parti ">
              {/*"Link" permet de faire une lien vers un chemin précis*/}
                <a id="link1"><Link to="/app">Application</Link></a>
                <a id="link2" ><Link to="/signup">Signin</Link></a>
                <a id="link3"><Link to="/login">Login</Link></a>
            </div>
        </div>
          <form onSubmit={this.onSubmit}>
          <h1>Login Below!</h1>
          <input
            type="text"
            name="pseudo"
            placeholder="Enter pseudo"
            value={this.state.pseudo}
            onChange={this.handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={this.state.email}
            onChange={this.handleInputChange}
            required
          />
          <input
            type="password"
            name="mdp"
            placeholder="Enter password"
            value={this.state.mdp}
            onChange={this.handleInputChange}
            required
          />
          <input type="submit" value="Submit"/>
        </form>
        <p>{this.state.message}</p>
        </div>
      );

    }
  }