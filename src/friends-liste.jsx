import React, { Component } from 'react';
import { BrowserRouter, Route, Router, Link, Switch } from "react-router-dom"
import './style/app.css';
import Chat from './components/chat';
import { withRouter } from "react-router-dom";
import Barregauche from './barre-gauche.jsx';
import StatWithFriend from './components/statistique'



export default class friendsliste extends Component {
    
      // création du State "friend"
      constructor(props) {
        super(props)
        this.state = {
          friend : '',
          message : '',
          amislist: [{_id:0, _pseudo:""}],
          firstFriend:"",
          room:''
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
          } else if(res.status === 402){
            this.setState({message: " vous avez déja cette utilisateur en amis"})
          } else{
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
          console.log(response)
          this.setState({amislist:response.data})
          this.setState({firstFriend:response.firstFriend})
          console.log("state", this.state.amislist)
        })
      }

    render() {
      const {message} = this.state
      const {amislist} = this.state
      console.log("here",amislist)
      return (
        <div className="corps-friends-liste">
          <div> 
            <Barregauche firstFriend={this.state.firstFriend}/>
            <div className="add-friends">
              <form class="ajouter-amis-friens-liste" onSubmit={this.onSubmit}>
                  <input 
                  className="ajouter-amis-friens-liste-p1"
                  name="friend"
                  type="text" 
                  placeholder="pseudo"
                  value={this.state.friend}
                  onChange={this.handleInputChange}
                  required
                  />
                  <input className="ajouter-amis-friens-liste-p2" type="submit" value="+"/>
                  <p>{message}</p>
              </form>
            </div>
          <div className="friend-list">
            {amislist.map((amis)=>(
              <Link to={"/app2/"+amis._id} >
                  <div className="friend" name={amis.pseudo}>
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