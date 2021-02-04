import imgpage2 from './image/img-page2.png';
import imgpage3 from './image/img-page3.png';
import imgpage4 from './image/img-page4.png';
import imageprofil from './image/img-profil.jpg';
import imagerocket from './image/rocket.png'
import imgpage6 from './image/img-page6.png'
import { BrowserRouter, Route, Router, Link, Switch } from "react-router-dom"
import './style/Home.css';

// page de présentation du projet, le style n'est pas a jour
function Home() {
  return (
    <div>
        <div className="nav-barre" id="nav-barre">
            <div className="logo-parti">
                <img className="logo" id="logo1" alt="logo" src="image/logo-ichat.png" alt="logo ichat"/>
            </div>
            <div class="bouton-parti ">
                <a id="link1"><Link to="/app">Application</Link></a>
                <a id="link2" ><Link to="/signup">Signin</Link></a>
                <a id="link3"><Link to="/login">Login</Link></a>
            </div>
        </div>
    <div className="home home1">
    <div className="texte-centre">
        <p className="garder_contact">Garder le contact</p>
        <p className="rejoignez">Rejoignez vos amis pour des sessions de chat intensse</p>
    </div>
    <div className="boutton-centre">
        <a className="boutton-centre1" href="#">En savoir plus</a>
        <a className="boutton-centre2" href="#">Ouvrir ichat</a>
    </div>
    <div>
        <div className="forme-box">
            <svg className="forme-bleu" viewBox="0 0 844 984" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M110.716 0H844.216V971.5C844.216 971.5 800.888 996.793 719.715 973.5C657.842 955.745 570.21 889.651 485.216 881C288.717 861 112.215 909.5 38.2164 785C-3.80878 714.295 -8.23337 652.827 10.7151 589.5C25.1316 541.319 58.2947 490.5 69.2148 443.5C80.135 396.5 69.0017 361.5 38.2164 283C7.43109 204.5 15.1438 137.055 20.2163 122.5C31.7175 89.5 54.0721 42.9213 110.716 0Z" fill="#0B225F"/>
            </svg>
        </div>
          <div className="point-rouge1"></div>
          <div className="point-rouge2"></div>
          <div className="point-rouge3"></div>
          <div className="point-rouge4"></div>
        </div>
    </div>
        <div className="page2">
        <div className="top">
            <svg width="100%" height="10hv" viewBox="0 0 1920 109" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 46.3073C0 46.3073 167.456 -1.38451e-05 355.407 0C543.359 1.38451e-05 667.326 46.3073 836.782 46.3073C1006.24 46.3073 1031.23 -6.60386e-10 1148.7 0C1266.17 6.66595e-10 1384.64 47.9513 1504.61 46.3073C1624.58 44.6632 1655.07 0 1764.54 5.43532e-05C1892.51 0.000117889 1920 46.3073 1920 46.3073V109H0V46.3073Z" fill="#626672" fill-opacity="0.09"/>
            </svg>
        </div>
        <div className="contenupage2">
            <div className="imagepage2">
                <img className="image1page2" src={imgpage2} alt="image gardez contact"/>
            </div>
            <div className="textepage2">
                <div className="titrepage2">
                    <h4>Gardez contact</h4>
                </div>
                <div className="texte1page2">
                    <p>Principe fondateur du projet iChat, gardez contact avec ses amis, pour des discussions sans fin au quotidien. Afin d’être au près de vos amistout le long de votre journée.</p>
                </div>
            </div>
        </div>
        <div className="bottom">
            <svg width="100%" height="10hv" viewBox="0 0 1920 109" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1920 62.6927C1920 62.6927 1752.54 109 1564.59 109C1376.64 109 1252.67 62.6927 1083.22 62.6927C913.762 62.6927 888.769 109 771.299 109C653.83 109 535.361 61.0487 415.392 62.6927C295.423 64.3368 264.931 109 155.459 109C27.4928 109 0 62.6927 0 62.6927V-7.62939e-06L1920 -7.62939e-06V62.6927Z" fill="#626672" fill-opacity="0.09"/>
            </svg>
        </div>
    </div>
    <div className="page3">
        <div className="contenupage3">
            <div className="textepage3">
                <div className="titrepage3">
                    <h4>Discussion fluide</h4>
                </div>
                <div className="texte1page3">
                    <p>Profite de différents cannaux de discusions, celon avec qui tu souhaite discuter et partager tes folles hisoires.Une interface agréable, privilégiant un thème sombre pour le confort visuel.</p>
                </div>
            </div>
            <div className="imagepage3">
                <img className="image1page3" src={imgpage3} alt="image discusions fluide"/>
            </div>
            <div className="bloc1"></div>
            <div className="bloc2"></div>
        </div>
    </div>
    <div className="page4">
        <div className="top">
            <svg width="100%" height="10hv" viewBox="0 0 1920 109" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 46.3073C0 46.3073 167.456 -1.38451e-05 355.407 0C543.359 1.38451e-05 667.326 46.3073 836.782 46.3073C1006.24 46.3073 1031.23 -6.60386e-10 1148.7 0C1266.17 6.66595e-10 1384.64 47.9513 1504.61 46.3073C1624.58 44.6632 1655.07 0 1764.54 5.43532e-05C1892.51 0.000117889 1920 46.3073 1920 46.3073V109H0V46.3073Z" fill="#626672" fill-opacity="0.09"/>
            </svg>
        </div>
        <div className="contenupage4">
            <div className="imagepage4">
                <img className="image1page4" src={imgpage4} alt="image telephone"/>
                <div className="classNameementpage4">
                    <div className="Alexandre">
                        <div className="part1">
                            <img className="image-alexandre" src={imageprofil} alt="image profil Alexandre"/>
                            <p className="td">Alexandre</p>
                        </div>
                        <div className="part2">
                            <p id="scoreAlexandre">4</p>
                            <img className="image-rocket" src={imagerocket} alt="image fussée"/>
                        </div>
                    </div>
                    <div className="Delphine">
                        <div className="part1">
                            <img className="image-Delphine" src={imageprofil}  alt="image profil Delphine"/>
                            <p>Delphine </p>
                        </div>
                        <div className="part2">
                            <p id="scoreDelphine">12</p>
                            <img className="image-rocket" src={imagerocket} alt="image fussée"/>
                        </div>
                    </div>
                    <div className="Paul">
                        <div className="part1">
                            <img className="image-Paul" src={imageprofil}  alt="image profil Paul"/>
                            <p>Paul</p>
                        </div>
                        <div className="part2">
                            <p id="scorePaul">26</p>
                            <img className="image-rocket" src={imagerocket} alt="image fussée"/>

                        </div>
                    </div>
                    <div className="Louis">
                        <div className="part1">
                            <img className="image-Louis" src={imageprofil}  alt="image profil Louis"/>
                            <p>Louis</p>
                        </div>
                        <div className="part2">
                            <p id="scoreLouis">8</p>
                            <img className="image-rocket" src={imagerocket} alt="image fussée"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="textepage4">
                <div className="titrepage4">
                    <h4>Un suivi sur tes relations </h4>
                </div>
                <div className="texte1page4">
                    <p>Chaques jours suplémentaire au quel tu va avoir des conversation avec un amis iChat, un compteur sera mis en place. Ce dernier ce nomme le iChat Score.Chaque jour le compteur s’incrément pour connaître
                        la durée de vos relations.</p>
                </div>
            </div>
        </div>
    </div>
    <div classNameName="page5" id="page5style">
        <button className="bouton-p5" id="bouton">Clique pour avoir accès à davantage</button>
    </div>
    <div id="page6">
    </div>
    <div className="page7">

<div className="contenupage7">
    <div className="lucas">
        <img className="image-lucas" src={imageprofil} alt="image profil Lucas"/>
        <p className="texte-lucasp6">Lucas</p>
    </div>
    <div className="superviser">
        <p className="textesuperviser"> Projet supervisé par ....</p>
        <img className="image-superviser" src={imgpage6} alt="image fleche"/>
    </div>
    <div className="matthieu">
        <img className="image-matthieu" src={imageprofil} alt="image profil Matthieu"/>
        <p className="texte-matthieup6">Matthieu</p>
    </div>
</div>
</div>
  </div>
  );
}

export default Home;
