import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BarreGauche from '../barre-gauche'
import '../style/paramètre.css';
import '../style/paramètre-responsive.css';

export default class parametre extends Component {
// création des states
  constructor(props) {
    super(props)
    this.state = {
        newName:"",
        message:""
    };
  }
      // ajout des changement lorsque le texte de l'input change
  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }
  // fonction permettant de faire un temps de pause
  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  onSubmit = async (event)=>{ // lance la fonction lorsque l'utilisateur clique sur le bouton
      event.preventDefault();
      console.log(this.state)
      const test = await fetch('https://ichatt.herokuapp.com/app/changeName', { // fonction permettant de faire une requête POST au serveur et de changer de nom
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
          }if (res.status === 401){
            // si erreur code est 401, renvoyer ce message
             this.setState({message:'Erreur'});
           } 
         })
         this.setState({newName:""})
        await this.sleep(3000)
        this.setState({message:""});
}
    render(){
        return(
            <div>
                <BarreGauche/> {/* Fait le rendu du composant "BarreGauche" */}
                <div className="paramètre-body">
                <div className="barre-du-haut-paramètre">
                  <p className="texte-barre-du-haut-paramètre"> Changer ici votre mots de passe : </p>
              </div>
              <div >
        <form className="changer-pseudo" onSubmit={this.onSubmit}> {/* formulaire pour envois la demande de changer de pseudo */}
                    <input className="entrer-nouveau-pseudo"
                      type="text"
                      name="newName"
                      placeholder="Entrer le nouveau pseudo voulu"
                      value={this.state.newName}
                      onChange={this.handleInputChange}
                      required
                    />
                    <input className="valider-nouveau-pseudo" type="submit" value="Valider"/>
                  </form>
                  <p>{this.state.message}</p>
                  </div>
                  </div>
            </div>
        );
    }
}