import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style/barre-amis-gauche.css';



export default class barregaucheamis extends Component {
  // création des states
    constructor(props) {
        super(props)
        this.state = {
          friend : '',
          message : '',
          amislist: [{_id:0, _pseudo:""}],
          user_nom : ''
        };
      }


    componentDidMount(){
          fetch('https://ichatt.herokuapp.com/app/friendlist', { // fonction permettant de faire une requête GET au serveur et d'envoyer les données pour récupérer la liste d'ami de l'utilisateur
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
            this.setState({amislist:response.data}) // stoque la liste d'amis dans le state "amislist"
            this.setState({user_nom:response.pseudo}) // stoque le pseudo du user dans le state "user_nom"
          })
      }

    render(){ // fait le rendu de la page
       return(
         <div class="liste-amis-gauche">
           <div class="friend-list-gauche">
        <div >
          {this.state.amislist.map((amis)=>( // map chaque ami de la liste pour créer des boutton pour naviguer entre chaque groupe de discution
            <Link to={"/app2/"+amis.id} >
              <div className="friend-list-gauche-amis" name={amis.pseudo}>
                  <p>{amis.pseudo}</p>
              </div>
          </Link>
          ))} 
        </div>
           </div>
           </div>
       );
   }

}

