import React, { Component } from 'react';
import '../style/app.css'
import io from "socket.io-client";
import { withRouter } from "react-router-dom";


export default class Chat extends Component {
  // création du state "message"
    constructor(props) {
        super(props)
        this.state = {
          message : ''
        };
      }
      // ajout des changement lorsque le texte de l'input change
      handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
          [name]: value
        });
      }
      // test de socket.io mais pas encore fonctionnel


    render() {
      return (
        <div className="colone-droite">
          {/*
                      <div className="chat">
                <div className="message-envoye">
                    <p>Message envoyé</p>
                    <p>Mesage</p>
                </div>
                <div className="message-recu">
                    <p>Message reçu</p>
                    <p>Mesage</p>
                </div>
                <div className="message-envoye">
                    <p >Message envoyé</p>
                    <p>Mesage</p>
                </div>
                <div className="message-recu">
                    <p>Message reçu</p>
                    <p>Mesage</p>
                </div>
            </div>*/}
            <div className="chat">
              <p>{this.props.valeur}</p>
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