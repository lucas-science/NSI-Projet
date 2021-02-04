import React, { Component } from 'react';
import '../style/app.css'

export default class FriendPannel extends Component {
    // création du State "friend"
    constructor(props) {
        super(props)
        this.state = {
          friend : ''
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
            console.log("nouvel amis");
          } else{
              console.log("erreur")
          }
        })
      }

    render() {
      return (
        <div className="colone-gauche">
        <div className="add-friends">
            <form onSubmit={this.onSubmit}>
                <input 
                name="friend"
                type="text" 
                placeholder="add a friend"
                value={this.state.friend}
                onChange={this.handleInputChange}
                required
                />
                <input type="submit" value="Submit"/>
            </form>
        </div>
        <div className="friend-list">
            <div className="friend">
                <p>Friend name</p>
            </div>
            <div className="friend">
                <p>Friend name</p>
            </div>
            <div className="friend">
                <p>Friend name</p>
            </div>
        </div>
    </div>
      ); 
    }
  }