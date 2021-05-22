import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Router, Link, Switch } from "react-router-dom"
import './style/login.css';
import './style/login-responsive.css';

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
      fetch('https://ichatt.herokuapp.com/authentification/signin', {
        method: 'POST',
        // credentials : include permet d'intégrer les cookie avec la requête
        withCredentials: true, 
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
          this.props.history.push('/app/friendlist'); // regirige l'utilisateur vers l'application en cas de connexion réussie
        }if (res.status === 401){
          // si erreur code est 401, renvoyer ce message
          this.setState({ message:'Mot de passee incorrecte'}); // renvois une erreur "mot de passe incorrecte" à l'utilisateur
        } 
        else {
          // sinon, renvoyer ce message
          this.setState({message:'Mot de passe ou email incorrecte'}); // renvois une erreur "mot de passe ou email incorrecte" à l'utilisateur
        }
      })
    }
  
    render() {
      return (
        <div className="body-login">
          <div className="box-centre-login">
            <div className="box-gauche-login">
              <p className="Hey-login">Hey</p>
              <p className="Texte-gauche-login">Si tu n’as pas encore de compte crée en un !</p>
              <Link className="boutton-singin-login" to="/signup"> SING UP</Link>
            </div>
            <div className="box-droite-login">
            <form onSubmit={this.onSubmit}> {/* formulaire de connexion */}
                      <h1 className="texte-login-boxdroite-login">Login</h1>   
                      <input className="email-login"
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        required
                      />
                      <br></br>
                      <input className="password-login"
                        type="password"
                        name="mdp"
                        placeholder="Password"
                        value={this.state.mdp}
                        onChange={this.handleInputChange}
                        required
                      />
                      <br></br>
                      <input className="bouton-login-droite-login" type="submit" value="Login"/>
                    </form>
                    <p className="incorecte-mdp-login">{this.state.message}</p>
                    </div>
                    </div>       
            </div>
        
      );

    }
  }
