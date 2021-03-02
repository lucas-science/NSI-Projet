import React, { Component } from 'react';
import '../style/app.css'
import { io } from "socket.io-client";

import { withRouter } from "react-router-dom";

const socket = io('http://localhost:4000');
export default class Chat extends Component {
  // création du state "message"
    constructor(props) {
        super(props)
        this.state = {
          message : '',
          friendid:'',
          groupetext:[{_id:0, text:"", author:""}]
        };
      }
      // ajout des changement lorsque le texte de l'input change
      handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
          [name]: value
        });
      }
      componentDidMount(){
        this.setState({friendid:this.props.valeur})
        fetch('http://localhost:4000/app/groupechatlist', {
          method: 'POST',
          // credentials : include permet d'intégrer les cookie avec la requête
          credentials: 'include', 
          body: JSON.stringify({
            friendID: this.props.valeur
          }),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        .then(response => response.json())
        .then(response => {
          this.setState({groupetext:response[0].message})
          console.log(response[0].message)
        })
      }
      componentDidUpdate(){
        if(this.state.friendid !== this.props.valeur){
          this.setState({friendid:this.props.valeur})
          fetch('http://localhost:4000/app/groupechatlist', {
            method: 'POST',
            credentials: 'include', 
            body: JSON.stringify({
              friendID: this.props.valeur
            }),
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          })
          .then(response => response.json())
          .then(response => {
            this.setState({groupetext:response[0].message})
            console.log(response[0].message)
          })
        }
      }
      onSubmit(){
        socket.emit("message", "SALUTTTTT")
      }

    render() {
      return (
        <div className="colone-droite">
          <p>{this.props.valeur}</p>
          <div className="chat">
            <div className="chat">
              {this.state.groupetext.map((mess)=>(
                <div className="message-envoye">
                  <p>{mess.author}</p>
                  <p>{mess.text}</p>
                </div>
              ))}
            </div>
            </div>
            
            <div className="message">
            <form className="forme-message" onSubmit={this.onSubmit}>
                    <input 
                    name="message"
                    type="text" 
                    placeholder="type your message"
                    value={this.state.message}
                    onChange={this.handleInputChange}
                    required
                    />
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        </div>
      ); 
    }
  }