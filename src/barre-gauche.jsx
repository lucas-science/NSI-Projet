import React, { Component } from 'react';
import './style/barre-gauche.css';
import profil from './image/img-profil.jpg'
import envelope from './image/envelope.png'
import users from './image/user.png'
import rouage from './image/settings.png'
import logout from './image/logout.png'

export default class barregauche extends Component {
     render(){
        return(
            <div>
                <div className="nav-barre-gauche">
                    <div className="profil-users">
                        <img className="profil"  src={profil} alt="photo de profil"/>
                    </div>
                    <div className="bouton-parti ">
                        <img  className="logo-message" src={envelope} alt="message"/>
                        <img  className="logo-users"src={users} alt="amis"/>
                        <img   className="logo-rouage" src={rouage} alt="paramétres"/>
                    </div>
                    <div className="deconextion">
                        <img   className="logo-deconextion" src={logout} alt="déconextion"/>
                    </div>
                </div>
            </div>

        );
    }

}