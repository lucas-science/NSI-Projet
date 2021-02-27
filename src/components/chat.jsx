import React, { Component } from 'react';
import '../style/app.css'
import io from "socket.io-client";
import { withRouter } from "react-router-dom";


export default class Chat extends Component {
  // création du state "message"
    constructor(props) {
        super(props)
        this.state = {
          message : '',
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
        fetch('http://localhost:4000/app/groupechatlist', {
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
          this.setState({groupetext:response})
        })
      }

    render() {
      return (
        <div className="colone-droite">
            <div className="chat">
              {this.state.groupetext.map((mess)=>(
                <div className="message-envoye">
                  <p>{mess.author}</p>
                  <p>{mess.text}</p>
                </div>
              ))}
            </div>
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