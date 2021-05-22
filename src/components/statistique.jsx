import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Barregauche from '../barre-gauche.jsx';
import rockets from '../image/rockets.png'
import '../style/stastistique.css';

export default class StatWithFriend extends Component {
// création des states
  constructor(props) {
    super(props)
    this.state = {
      statistique_amis: [{}], 
      amislist: [{}],
      FirstFriend:""
    };
  }
    componentDidMount(){
        fetch('https://ichatt.herokuapp.com/app/statByUser', { // fonction permettant de faire une requête GET au serveur et d'envoyer les données pour récupérer les statistique de l'utilisateur
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
          this.setState({statistique_amis:response}) // stoque les statistiques
          console.log("statistique : ",this.state.statistique_amis)
        })
        fetch('https://ichatt.herokuapp.com/app/friendlist', { // fonction permettant de faire une requête GET au serveur et d'envoyer les données pour récupérer la liste d'amis
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
          console.log(response)
          this.setState({amislist:response.data}) // stoque la réponsse
          this.setState({FirstFriend:response.firstFriend}) // stoque le première ami
        })
      }



    render(){
      const {statistique_amis} = this.state
        return(
          <div>
            <Barregauche firstFriend={this.state.FirstFriend}/> {/* Fait le rendu du composant "Barre gauche" */}
            <div className="statistique-body">
              <div className="barre-du-haut-stat">
                <p className="texte-barre-du-haut-stat">Nombre de message échanger :                   Ichat rockets <img  className="logo-rockets-calssement-stat-haut"src={rockets} alt="amis"/></p>
              </div>
              <div className="classement-stat">
                {statistique_amis.map((amis)=>( // map chaque statistique avec chacun des amis de l'utilisateur
                  <div className="casse-classement-stat">
                    <p>{amis.friend_name} : {amis.nbr_message} <img  className="logo-rockets-calssement-stat"src={rockets} alt="amis"/> </p>
                  </div>
                ))}
              </div>
              </div>
            </div>
        );
    }
}