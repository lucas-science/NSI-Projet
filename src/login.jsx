import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Router, Link, Switch } from "react-router-dom"

export default class login extends Component {
      // création des states suivant
    constructor(props) {
      super(props)
      this.state = {
        email : '',
        mdp: '',
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
  
    // lorsque le formulaire est submit, envoyer la requête POST suivante, qui envois les données
    onSubmit = (event) => {
      event.preventDefault();
      console.log("state login : ",this.state)
      fetch('http://localhost:4000/authentification/signin', {
        method: 'POST',
        // credentials : include permet d'intégrer les cookie avec la requête
        credentials: 'include', 
        body: JSON.stringify({
          email:this.state.email,
          mdp:this.state.mdp
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if (res.status === 200) {
          // s'il y a aucune erreur, renvoyer vers l'acceuil
          this.props.history.push('/');
        }if (res.status === 401){
          // si erreur code est 401, renvoyer ce message
          this.setState({message:'Mot de passee incorrecte'});
        } 
        else {
          // sinon, renvoyer ce message
          this.setState({message:'Mot de passe ou email incorrecte'});
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
                <a id="link1"><Link to="/app">Application</Link></a>
                <a id="link2" ><Link to="/signup">Signin</Link></a>
                <a id="link3"><Link to="/login">Login</Link></a>
            </div>
        </div>
        <form onSubmit={this.onSubmit}>
                    <h1>Login Below!</h1>
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