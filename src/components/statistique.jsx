import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Barregauche from '../barre-gauche.jsx';
import rockets from '../image/rockets.png'

export default class StatWithFriend extends Component {

  constructor(props) {
    super(props)
    this.state = {
      statistique_amis: [{}], 
      amislist: [{}],
      FirstFriend:""
    };
  }
    componentDidMount(){
        fetch('http://localhost:4000/app/statByUser', {
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
          this.setState({statistique_amis:response})
          console.log("statistique : ",this.state.statistique_amis)
        })
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
          console.log(response)
          this.setState({amislist:response.data})
          this.setState({FirstFriend:response.firstFriend})
        })
      }



    render(){
      const {statistique_amis} = this.state
        return(
          <div>
            <Barregauche firstFriend={this.state.FirstFriend}/>
            <div className="statistique-body">
              <div className="barre-du-haut-stat">
                <p className="texte-barre-du-haut-stat">Nombre de message échanger :                   Ichat rockets <img  className="logo-rockets-calssement-stat-haut"src={rockets} alt="amis"/></p>
              </div>
              <div className="classement-stat">
                {statistique_amis.map((amis)=>(
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