import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class StatWithFriend extends Component {

  constructor(props) {
    super(props)
    this.state = {
      statistique_amis: [{}]
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
      } 
    render(){
      const {statistique_amis} = this.state
        return(
            <div>
              {statistique_amis.map((amis)=>(
                <div>
                  <p>{amis.friend_name}</p>
                  <p>Nombre de message envoyé entre vous : {amis.nbr_message}</p>
                </div>
              ))}
            </div>
        );
    }
}