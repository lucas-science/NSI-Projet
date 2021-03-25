import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class StatWithFriend extends Component {
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
          console.log("statistique : ",response)
        })
      } 
    render(){
        return(
            <p>Friend statistique</p>
        );
    }
}