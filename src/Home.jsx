import logoichat from './image/logo-ichat.png'
import fleche from './image/fleche.png'
import { BrowserRouter, Route, Router, Link, Switch } from "react-router-dom"
import './style/Home.css';
import './style/responsive.css'

// page de présentation du projet, le style n'est pas a jour

function Home() {
  return (
    <div>
        <div className="home home1" id="pagehome">
        <div className="nav-barre" id="nav-barre">
            <div className="logo-parti">
                <a href="#pagehome">  <img className="logo" id="logo1"  src={logoichat} alt="logo ichat"/></a>
            </div>
            <div className="bouton-parti ">
                <a id="link1"><Link to="/app/friendlist">Application</Link></a>
                <a id="link2" ><Link to="/signup">Signin</Link></a>
                <a id="link3"><Link to="/login">Login</Link></a>
            </div>
        </div>

        <div className="home-gauche">
            <div className="texte-centre">
                <p className="garder_contact textanimhome">Garder le contact</p>
                <p className="rejoignez textanimhome">Rejoignez vos amis pour des sessions de chat intense</p>
            </div>
            <div className="boutton-centre">
                <a className="boutton-centre1" href="#page2">En savoir plus</a>
                <a className="boutton-centre2" href="#"><Link to="/app/friendlist">Ouvrir iChat</Link></a>
            </div>
        </div>
        <div>
            <div className="forme-box">
            </div>
            <div className="point-rouge1"></div>
            <div className="point-rouge2"></div>
            <div className="point-rouge3"></div>
            <div className="point-rouge4"></div>

        </div>
        <div>
            <a href="#page2">  <img className="fleche" id="logo1"  src={fleche} alt="fleche"/></a>
        </div>
    </div>
    </div>
  );
}

export default Home;
