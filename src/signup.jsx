import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Router, Link, Switch } from "react-router-dom"
import './style/singup.css';

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
          this.props.history.push('/app/friendlist');
          console.log("info envoyé");
        } else {
          // s'il y a eu une erreur, renvoyer le message suivant
          this.setState({message:'Pseudo ou email déjà utilisé'});
        }
      })

    }
  
    render() {
      return (
      <div className="body-singup">
        <div className="box-centre-singup">
          <div className="box-gauche-singup">
          <form onSubmit={this.onSubmit}>
          <h1 className="texte-Create-Account-boxgauche-singup">Create Account</h1>
          <input className="pseudo-singup" 
            type="text"
            name="pseudo"
            placeholder="Pseudo"
            value={this.state.pseudo}
            onChange={this.handleInputChange}
            required
          />
          <br></br>
          <input className="email-singup"
            type="email"
            name="email"
            placeholder="E-mail"
            value={this.state.email}
            onChange={this.handleInputChange}
            required
          />
          <br></br>
          <input className="password-singup"
            type="password"
            name="mdp"
            placeholder="Password"
            value={this.state.mdp}
            onChange={this.handleInputChange}
            required
          />
          <br></br>
          <input className="bouton-singup-gauche-singup" type="submit" value="SING UP"/>
        </form>
        <p>{this.state.message}</p>
        </div>
        <div className="box-droite-singup">
          <p className="Welcome-back-singup">Welcome back </p>
          <p className="Texte-gauche-singup">Si tu as déjà un compte, il te suffit de te connecter ! </p>
          <Link className="boutton-singin-singup" id="link6"  to="/login">SIGN IN</Link>
        </div>
        </div>
        </div>
      );

    }
  }