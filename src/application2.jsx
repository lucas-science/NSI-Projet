import React, { Component } from 'react';

import Chat from './components/chat';
import { Link } from 'react-router-dom';
import './style/app.css';
import './style/app-responsive.css';
import Barregauche from './barre-gauche.jsx';
import Barreamisgauche from './barre-amis-gauche';


export default class Application2 extends Component {
    
  
      // création des states
      constructor(props) {
        super(props)
        this.state = {
          friend : '',
          message : '',
          amislist: [{_id:0, _pseudo:""}],
          firstFriend:"",
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

      // fonction permettant de faire une requête POST au serveur et d'envoyer les données pour ajouter un amis
    onSubmit = (event) => {
        event.preventDefault();
        console.log("state envois demande amis : ",this.state)
        // requête POST
        fetch('https://ichatt.herokuapp.com/app/newfriend', {
          method: 'POST',
          credentials: 'include', // credentials : include permet d'intégrer les cookie avec la requête
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

      // fonction permettant de faire une requête GET au serveur et d'envoyer les données pour récupérer la liste d'ami de l'utilisateur
      componentDidMount(){
        fetch('https://ichatt.herokuapp.com/app/friendlist', {
          method: 'GET',
          // credentials : include permet d'intégrer les cookie avec la requête
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        .then(response => response.json())
        .then(response => { // récupère la reponsse du serveur
          this.setState({amislist:response.friends}) // stoque la list d'ami dans le state "amislist"
          this.setState({user_nom:response.pseudo}) // stoque le pseudo du user dans le state "user_nom"
          this.setState({firstFriend:response.firstFriend}) // stoque le première ami du user dans le state "firstFriend"
        })
      }

    render() {
      const {message} = this.state
      const { id } = this.props.match.params;
      return (
      <div className="corps"> 
        <div className="colone-gauche">
          <Barregauche firstFriend={this.state.firstFriend}/> {/* Barre ne navigation */}
          <Barreamisgauche/> {/*Menu où il y a les différents amis */}
      </div>
      <Chat valeur={id} nom={this.state.user_nom}/> {/*Le chate */}
    </div>
      ); 
    }
  }