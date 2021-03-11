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
          groupetext:[{_id:0, text:"", author:""}],
          room:'',
          user_nom:''
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
        this.setState({user_nom:this.props.nom})
        fetch('http://localhost:4000/app/getgroupechatlist', {
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
          //console.log(response[0].message)
          this.setState({room:response[0]._id})
          //console.log(this.state.room)
          socket.emit('joinRoom', this.state.room)
        })
      }

      componentDidMount(){
        socket.on('message', message =>{
          console.log(message)
          let {groupetext} = this.state
          groupetext.push(message)
          console.log(groupetext)
        })
        socket.on('info', message =>{
          console.log(message)
        })
      }
      componentDidUpdate(){
        socket.on('message', message =>{
          console.log(message)
          let {groupetext} = this.state
          groupetext.push(message)
          console.log(groupetext)
        })
      }
      
      componentDidUpdate(){
        if(this.state.friendid !== this.props.valeur){
          this.setState({friendid:this.props.valeur})
          fetch('http://localhost:4000/app/getgroupechatlist', {
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
            //console.log(response[0].message)
            this.setState({room:response[0]._id})
            //console.log(this.state.room) 
            socket.emit('joinRoom', this.state.room)
          })
        }
      }
      onSubmit = () => {
        socket.emit("sendmessage", {
          message:this.state.message,
          author:this.props.nom,
          room:this.state.room
        })
        this.setState({message:''})
      }

    render() {
      return (
        <div className="colone-droite">
          <p>{this.props.nom}</p>
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
            <div className="forme-message">
                    <input 
                    name="message"
                    type="text" 
                    placeholder="type your message"
                    value={this.state.message}
                    onChange={this.handleInputChange}
                    required
                    />
                    <input type="submit" value="Submit" onClick={this.onSubmit}/>
                </div>
            </div>
        </div>
      ); 
    }
  }