import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style/barre-gauche.css';
import profil from './image/img-profil.jpg'
import envelope from './image/envelope.png'
import users from './image/user.png'
import rouage from './image/settings.png'
import logout from './image/logout.png'
import rockets from './image/rockets.png'
import './style/barre-gauche-responsive.css';

export default class barregauche extends Component {
// création des states 
    constructor(props) {
        super(props)
        this.state = {
            firstFriend:""
        };
      }
    // fonction permettant de faire une requête POST au serveur et d'envoyer les données pour récupérer la liste d'ami de l'utilisateur 
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
          this.setState({firstFriend:response.firstFriend}) // stoque le première amis dans le state "firstFriend"
        })
    }

     render(){ // fait le rendu de la page 
        return(
            <div>
                <div className="nav-barre-gauche">
                    <div className="profil-users">
                        <img className="profil"  src={profil} alt="photo de profil"/>
                    </div>
                    <div className="bouton-part "> {/*Lien entre les différents onglets */}
                        <Link to={'/app2/'+this.state.firstFriend}> {/* renvois vers le groupe de message du première amis */}
                            <img  className="logo-message" src={envelope} alt="message"/> 
                        </Link>
                        <Link to='/app/friendlist'>
                            <img  className="logo-users"src={users} alt="amis"/>
                        </Link>
                        <Link to='/app/statistique'>
                            <img  className="logo-rockets"src={rockets} alt="statistique"/>
                        </Link>
                        <Link to='/app/parametre'>
                            <img   className="logo-rouage" src={rouage} alt="paramétres"/>
                        </Link>
                    </div>
                    <Link to='/'>
                        <div className="deconextion">
                            <img  onClick={this.OnSubmit} className="logo-deconextion" src={logout} alt="déconextion"/> {/* quitte l'application et fait un retour vers le menu */}
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}

