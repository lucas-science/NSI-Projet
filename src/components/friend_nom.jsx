import React, { Component } from 'react';


export default class friend_nom extends Component {
  // création des states
    constructor(props) {
        super(props)
        this.state = {
            nom:'',
            id:''
        };
      }

    // fonction permettant de faire une requête POST au serveur et d'envoyer les données pour récupérer le nom d'un amis
    componentDidMount(){
        fetch('https://ichatt.herokuapp.com/app/getFriendName', {
          method: 'POST',
          // credentials : include permet d'intégrer les cookie avec la requête
          credentials: 'include', 
          body: JSON.stringify({
            name: this.props.id
          }),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        .then(response => response.json())
        .then(response => {
            this.setState({nom:response}) // stoque la réponsse
            this.setState({id:this.props.id})
        })
    }
    componentDidUpdate(){
        if(this.state.id != this.props.id){ // si l'utilisateur a changé de groupe de discution
            fetch('https://ichatt.herokuapp.com/app/getFriendName', {
                method: 'POST',
                // credentials : include permet d'intégrer les cookie avec la requête
                credentials: 'include', 
                body: JSON.stringify({
                  name: this.props.id
                }),
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                }
              })
              .then(response => response.json())
              .then(response => {
                  this.setState({nom:response}) // stoque la réponsse
                  this.setState({id:this.props.id})
              })
        }
    }
    render(){
        return( // fait le rendu du nom de l'amis
            <p className="barre-du-haut-amis-texte">
                {this.state.nom}
            </p>

        );
    }
}