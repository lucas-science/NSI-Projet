import React, { Component } from 'react';
import { BrowserRouter, Route, Router, Link, Switch } from "react-router-dom"
import Chat from './components/chat';
import { withRouter } from "react-router-dom";
import Barregauche from './barre-gauche.jsx';
import StatWithFriend from './components/statistique'
import './style/friend-liste.css';
import './style/friend-liste-responsive.css';


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

      sleep = (milliseconds) => { // fonction qui permet d'attendre
        return new Promise(resolve => setTimeout(resolve, milliseconds))
      }
      // fonction permettant de faire une requête POST au serveur et d'envoyer les données
    onSubmit = async (event) => {
        event.preventDefault();
        console.log("state envois demande amis : ",this.state)
        // requête POST
        fetch('https://ichatt.herokuapp.com/app/newfriend', {
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
            this.setState({message: "ajout effectué"})
          } else if(res.status === 400){
            this.setState({message : "l'utilisateur rechercher n'existe pas"})
          } else if(res.status === 402){
            this.setState({message: " vous avez déja cette utilisateur en amis"})
          } else{
              console.log("erreur")
          }
        })
        await this.sleep(3000)
        this.setState({message:""});
      }
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
        .then(response => {
          console.log(response)
          this.setState({amislist:response.data}) // stoque la liste d'ami
          this.setState({firstFriend:response.firstFriend}) // stoque le premère ami
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
            <Barregauche firstFriend={this.state.firstFriend}/> {/* fait le rendu du composant "Barregauche" */}
            <div className="add-friends">
              <form class="ajouter-amis-friens-liste" onSubmit={this.onSubmit}> {/* formulaire pour ajouter l'amis */}
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
                  <p className="message-erreur-ajt-amis">{message}</p>
              </form>
            </div>
          <div className="friend-list">
            {amislist.map((amis)=>(  // map la liste d'amis et retourne pour chaque amis une boutton redirigeant vers le groupe de discution
              <Link to={"/app2/"+amis.id} >
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