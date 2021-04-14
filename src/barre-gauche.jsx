import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style/barre-gauche.css';
import profil from './image/img-profil.jpg'
import envelope from './image/envelope.png'
import users from './image/user.png'
import rouage from './image/settings.png'
import logout from './image/logout.png'
import rockets from './image/rockets.png'


export default class barregauche extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstFriend:""
        };
      }
    componentDidMount(){
        fetch('http://localhost:4000/app/friendlist', {
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
          this.setState({firstFriend:response.firstFriend})
        })
    }

     render(){
        return(
            <div>
                <div className="nav-barre-gauche">
                    <div className="profil-users">
                        <img className="profil"  src={profil} alt="photo de profil"/>
                    </div>
                    <div className="bouton-part ">
                        <Link to={'/app2/'+this.state.firstFriend}>
                            <img  className="logo-message" src={envelope} alt="message"/>
                        </Link>
                        <Link to='/app/friendlist'>
                            <img  className="logo-users"src={users} alt="amis"/>
                        </Link>
                        <Link to='/app/statistique'>
                            <img  className="logo-rockets"src={rockets} alt="amis"/>
                        </Link>
                        <Link to='/app/parametre'>
                            <img   className="logo-rouage" src={rouage} alt="paramétres"/>
                        </Link>
                    </div>
                    <Link to='/'>
                        <div className="deconextion">
                            <img  onClick={this.OnSubmit} className="logo-deconextion" src={logout} alt="déconextion"/>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}