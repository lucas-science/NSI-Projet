import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BarreGauche from '../barre-gauche'

export default class parametre extends Component {

  constructor(props) {
    super(props)
    this.state = {
        newName:"",
        message:""
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }
    
    onSubmit = (event)=>{
        event.preventDefault();
        console.log(this.state)
        fetch('http://localhost:4000/app/changeName', {
            method: 'POST',
            // credentials : include permet d'intégrer les cookie avec la requête
            credentials: 'include', 
            body: JSON.stringify({
                newName:this.state.newName
              }),
            headers: {
              'Content-Type': 'application/json',
            }
          })
          .then(res => {
            if (res.status === 200) {
              // s'il y a aucune erreur, renvoyer vers l'acceuil
              this.setState({message:'Le Changement de pseudo a bien été effectué'});
              console.log("OK")
            }if (res.status === 401){
              // si erreur code est 401, renvoyer ce message
              this.setState({message:'Erreur'});
            } 
          })
          this.setState({newName:""})
    }
    render(){
        return(
            <div>
                <BarreGauche/>
        <form onSubmit={this.onSubmit}>
                    <input
                      type="text"
                      name="newName"
                      placeholder="Entrer le nouveau pseudo voulu"
                      value={this.state.newName}
                      onChange={this.handleInputChange}
                      required
                    />
                    <input type="submit" value="Submit"/>
                  </form>
                  <p>{this.state.message}</p>
            </div>
        );
    }
}