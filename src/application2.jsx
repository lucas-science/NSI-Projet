import React, { Component } from 'react';

import Chat from './components/chat';
import { Link } from 'react-router-dom';
import './style/app.css';
import Barregauche from './barre-gauche.jsx';
import Barreamisgauche from './barre-amis-gauche';


export default class Application2 extends Component {
    
  
      // création du State "friend"
      constructor(props) {
        super(props)
        this.state = {
          friend : '',
          message : '',
          amislist: [{_id:0, _pseudo:""}],
          user_nom : ''
        };
      }
    
      // ajout des changement lorsque le texte de l'input change
      handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
          [name]: value
        });
      }

      // fonction permettant de faire une requête POST au serveur et d'envoyer les données
    onSubmit = (event) => {
        event.preventDefault();
        console.log("state envois demande amis : ",this.state)
        // requête POST
        fetch('http://localhost:4000/app/newfriend', {
          method: 'POST',
          // credentials : include permet d'intégrer les cookie avec la requête
          credentials: 'include', 
          body: JSON.stringify({
            new_friend: this.state.friend
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        // renvois message de réussite ou non
        .then(res => {
          if (res.status === 200) {
            this.setState({message: ""})
          } else if(res.status === 400){
            this.setState({message : "l'utilisateur rechercher n'existe pas"})
          }
          else{
              console.log("erreur")
          }
        })
      }
      componentDidMount(){
        fetch('http://localhost:4000/app/friendlist', {
          method: 'GET',
          // credentials : include permet d'intégrer les cookie avec la requête
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        .then(response => response.json())
        .then(response => {
          //console.log(response)
          this.setState({amislist:response.friends})
          this.setState({user_nom:response.pseudo})
          //console.log("state", this.state.amislist, this.state.user_nom)
        })
      }

    render() {
      const {message} = this.state
      const { id } = this.props.match.params;
      return (
      <div className="corps"> 
        <div className="colone-gauche">
          <Barregauche/>
          <Barreamisgauche/>
      </div>
      <Chat valeur={id} nom={this.state.user_nom}/>
    </div>
      ); 
    }
  }