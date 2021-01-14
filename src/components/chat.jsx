import React, { Component } from 'react';
import '../style/app.css'

export default class Chat extends Component {
    render() {
      return (
        <div className="colone-droite">
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
            </div>
            <div className="message">
            <form className="forme-message">
                    <input type="text" placeholder="type your message"/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        </div>
      ); 
    }
  }