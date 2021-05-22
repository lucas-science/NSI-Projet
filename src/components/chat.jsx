import React, { Component } from 'react';
import { io } from "socket.io-client"; 
import { withRouter } from "react-router-dom";
import FriendNom from './friend_nom'



const socket = io('https://ichatt.herokuapp.com'); // connexion au WebSocket
export default class Chat extends Component {
  // crétion des states
    constructor(props) {
        super(props)
        this.state = {
          message : '',
          friendid:'',
          groupetext:[{_id:0, text:"", author:""}],
          room:'',
          user_nom:'',
          change:false
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
        this.setState({friendid:this.props.valeur}) // récupère les infos données dans le composant "aplication2"
        this.setState({user_nom:this.props.nom})// récupère les infos données dans le composant "aplication2"
        fetch('https://ichatt.herokuapp.com/app/getgroupechatlist', {      // fonction permettant de faire une requête POST au serveur et d'envoyer les données pour récupérer la liste de message d'un groupe
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
          this.setState({groupetext:response[0].message})// stoque les messages
          //console.log(response[0].message)
          this.setState({room:response[0]._id}) // stoque l'id du groupe
          //console.log(this.state.room)
          socket.emit('joinRoom', this.state.room) // envois au socket dans le canal "joinRoom" les données
        })
      }

      componentDidUpdate(){
        if(this.state.friendid !== this.props.valeur){ // si l'utilisateur change de groupe de discution
          this.setState({friendid:this.props.valeur})
          fetch('https://ichatt.herokuapp.com/app/getgroupechatlist', {// fonction permettant de faire une requête POST au serveur et d'envoyer les données pour récupérer la liste de message d'un groupe
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
            this.setState({groupetext:response[0].message})// stoque les messages
            //console.log(response[0].message)
            this.setState({room:response[0]._id})// stoque l'id du groupe
            //console.log(this.state.room) 
            socket.emit('leave')// envois au socket dans le canal "leave"
            socket.emit('joinRoom', this.state.room)// envois au socket dans le canal "joinRoom" les données
          })
        }
      }

      componentDidMount(){
        socket.on('message', message =>{ // lorsque le socket client reçois des infos du socket serveur dans le canal "message"
          console.log(message)
          let {groupetext} = this.state
          groupetext.push(message) // ajoute à la liste groupetext le message
          //console.log(groupetext)
          this.setState({change:true}) // stoque le fait que il y a un changement
          console.log(groupetext)
        })
        socket.on('messageDelete',value =>{// lorsque le socket client reçois des infos du socket serveur dans le canal "messageDelete"
          console.log('le message suprimé : ',value)
          let {groupetext} = this.state
          const index = groupetext.findIndex(mess => mess._id === value) // récupère l'index du message à suprimé dans la liste
          if(index != -1){
            groupetext.splice(index,1) // suprime le message grâce à son index dans la liste
            this.setState({change:true}) // stoque le fait que il y a un changement
          }
        })
        socket.on('info', message =>{ // lorsque le socket client reçois des infos du socket serveur dans le canal "info"
          console.log(message)
        })
      }
      onSubmit = () => { // lorsque l'utilisateur envois un message
        if(this.state.message != ''){
          socket.emit("sendmessage", { // envois au socket dans le canal 'sendmessage' les infos du message
            message:this.state.message,
            author:this.props.nom,
            room:this.state.room
          })
          this.setState({message:''}) // suprime le text présent dans l'input
        }
      }
      deleteMessage = (event) =>{ // fonction pour suprimé un message
        const { value } = event.target;
        socket.emit('getMessageToDelete',{ // envois au socket dans le canal 'getMessageToDelete' les infos du message a suprimé
          value: value,
          room: this.state.room
        })

      }
    render() {
      const BLOCK = {diplay: 'block'} // style 1 du bouton delete
      const NONE= {diplay: 'none'}// style 2 du bouton delete
      if(this.state.change === true){ // s'il y a un changement
        this.setState({change:false}) 
        return(
          <div>
            <div className="barre-du-haut-amis">
          <FriendNom id={this.props.valeur}/> {/* fait le rendu du composant "friendNom" */}
          </div>
          <div className="colone-droite">
            <div className="chat">
              {this.state.groupetext.map((mess)=>( // map l'ensemble des messages
                <div className="message-envoye">
                  <p className="author">{mess.author}</p>
                  <p className="textemessageP">{mess.text}</p>
                  { this.props.nom == mess.author ? <button value={mess._id} className="boutton-suprimer-un-message" onClick={this.deleteMessage}> X </button> : console.log('')}
                </div>
              ))}
            </div>
            </div>
            <div className="message">
                <div className="forme-message">
                    <input 
                    class="entrer-votre-message"
                    name="message"
                    type="text" 
                    placeholder="type your mssage"
                    value={this.state.message}
                    onChange={this.handleInputChange}
                    required
                    />
                    <input class="entrer-votre-message" type="submit" value="Submit" onClick={this.onSubmit}/>
                </div>
            </div>
          </div>

        )
      } else{ // s'il n'y a pas de changement
      return (
        <div>
        <div className="barre-du-haut-amis">
          <FriendNom id={this.props.valeur}/>{/* fait le rendu du composant "friendNom" */}
          </div>
        <div className="colone-droite">
          <div className="chat">
            <div className="chat">
              {this.state.groupetext.map((mess)=>(// map l'ensemble des messages
                <div className="message-envoye">
                  <p className="author">{mess.author}</p>
                  <p className="textemessageP">{mess.text}</p>
                  { this.props.nom == mess.author ? <button value={mess._id} className="boutton-suprimer-un-message" onClick={this.deleteMessage}> X </button> : console.log('')}
                </div>
              ))}
            </div>
          </div>
            <div className="message">
                <div className="forme-message">
                  <div className="autour-entrer-message">
                    <input 
                    className="type-your-message"
                    name="message"
                    type="text" 
                    placeholder="type your message..."
                    value={this.state.message}
                    onChange={this.handleInputChange}
                    required
                    />
                    <input className="submit" type="submit" value="Submit" onClick={this.onSubmit}/>
                    </div>
                </div>
            </div>
        </div>
        </div>
      ); 
      }
    }
  }
