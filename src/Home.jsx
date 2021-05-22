import logoichat from './image/logo-ichat.png'
import fleche from './image/fleche.png'
import imagepage2 from './image/img-page2.png'
import imagepage3 from './image/img-page3.png'
import imagepage4 from './image/img-page4.png'
import imgprofil from './image/img-profil.jpg'
import fussée from './image/rocket.png'
import imgpage6 from './image/img-page6.png'
import imgLucas from './image/profil-Lucas.png'
import imgMatthieu from './image/profil-Matthieu.png'
import imglogotwitter from './image/logo-twitter.png'
import imglogoinsta from './image/logo-insta.png'
import imglogogithub from './image/003-github.png'
import logoichatblanc from './image/logo-ichat-white.png'
import { BrowserRouter, Route, Router, Link, Switch } from "react-router-dom"
import './style/Home.css';
import './style/responsive.css'

// page de présentation du projet

function Home() {
  return (
    <div>
        <div className="home home1" id="pagehome">
        <div className="nav-barre" id="nav-barre">
            <div className="logo-parti">
                <a href="#pagehome">  <img className="logo" id="logo1"  src={logoichat} alt="logo ichat"/></a>
            </div>
            <div className="bouton-parti ">
                <a id="link1" ><Link id="link4" className="link-color" to="/app/friendlist">Application</Link></a>
                <a id="link2" ><Link id="link5" className="link-color" to="/signup">SIGN UP</Link></a>
                <a id="link3" ><Link id="link6" className="link-color" to="/login">Login</Link></a>
            </div>
        </div>

        <div className="home-gauche">
            <div className="texte-centre">
                <p className="garder_contact textanimhome">Garder le contact</p>
                <p className="rejoignez textanimhome">Rejoignez vos amis pour des sessions de chat intense</p>
            </div>
            <div className="boutton-centre">
                <a className="boutton-centre1" href="#page2">En savoir plus</a>
                <a className="boutton-centre2" ><Link className="boutton-centre2-link" to="/app/friendlist">Ouvrir iChat</Link></a>
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
    <div className="page2" id="page2">
        <div className="top">
            <svg width="100%" viewBox="0 0 1920 109" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 46.3073C0 46.3073 167.456 -1.38451e-05 355.407 0C543.359 1.38451e-05 667.326 46.3073 836.782 46.3073C1006.24 46.3073 1031.23 -6.60386e-10 1148.7 0C1266.17 6.66595e-10 1384.64 47.9513 1504.61 46.3073C1624.58 44.6632 1655.07 0 1764.54 5.43532e-05C1892.51 0.000117889 1920 46.3073 1920 46.3073V109H0V46.3073Z" fill="#626672" fill-opacity="0.09"/>
            </svg>
        </div>
        <div className="contenupage2">
            <div className="imagepage2 partie1">
                <img className="image1page2" src={imagepage2} alt="image gardez contact"/>
            </div>
            <div className="textepage2 partie2">
                <div className="titrepage2">
                    <h4>Gardez le contact</h4>
                </div>
                <div className="texte1page2">
                    <p>Principe fondateur du projet iChat, gardez le contact avec vos amis pour des discussions sans fin au quotidien. Ichat vous permt d’être au près de vos amis tout le long de votre journée.</p>
                </div>
            </div>
        </div>
        <div className="bottom">
            <svg width="100%" viewBox="0 0 1920 109" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1920 62.6927C1920 62.6927 1752.54 109 1564.59 109C1376.64 109 1252.67 62.6927 1083.22 62.6927C913.762 62.6927 888.769 109 771.299 109C653.83 109 535.361 61.0487 415.392 62.6927C295.423 64.3368 264.931 109 155.459 109C27.4928 109 0 62.6927 0 62.6927V-7.62939e-06L1920 -7.62939e-06V62.6927Z" fill="#626672" fill-opacity="0.09"/>
            </svg>
        </div>
    </div>
    <div className="page3">
        <div className="contenupage3">
            <div className="textepage3 partie1">
                <div className="titrepage3">
                    <h4>Discussion fluide</h4>
                </div>
                <div className="texte1page3">
                    <p>Profite de différents canaux de discussions, selon avec qui tu souhaites discuter et partager tes folles histoires. Une interface agréable, privilégiant un thème sombre pour le confort visuel.
                    </p>
                </div>
            </div>
            <div className="imagepage3 partie2">
                <img className="image1page3" src={imagepage3} alt="image discusions fluide"/>
            </div>
        </div>
    </div>
    <div className="page4">
        <div className="top">
            <svg width="100%" viewBox="0 0 1920 109" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 46.3073C0 46.3073 167.456 -1.38451e-05 355.407 0C543.359 1.38451e-05 667.326 46.3073 836.782 46.3073C1006.24 46.3073 1031.23 -6.60386e-10 1148.7 0C1266.17 6.66595e-10 1384.64 47.9513 1504.61 46.3073C1624.58 44.6632 1655.07 0 1764.54 5.43532e-05C1892.51 0.000117889 1920 46.3073 1920 46.3073V109H0V46.3073Z" fill="#626672" fill-opacity="0.09"/>
            </svg>
        </div>
        <div className="contenupage4">
            <div className="imagepage4 partie1">
                <img className="image1page4" src={imagepage4} alt="image telephone"/>
                <div className="classNameementpage4">
                    <div className="Alexandre elem">
                        <div className="part1">
                            <img className="image-alexandre" src={imgprofil} alt="image profil Alexandre"/>
                            <p className="td">Alexandre</p>
                        </div>
                        <div className="part2">
                            <p id="scoreAlexandre">4</p>
                            <img className="image-rocket" src={fussée} alt="image fussée"/>
                        </div>
                    </div>
                    <div className="Delphine elem">
                        <div className="part1">
                            <img className="image-Delphine" src={imgprofil} alt="image profil Delphine"/>
                            <p>Delphine </p>
                        </div>
                        <div className="part2">
                            <p id="scoreDelphine">12</p>
                            <img className="image-rocket" src={fussée} alt="image fussée"/>
                        </div>
                    </div>
                    <div className="Paul elem">
                        <div className="part1">
                            <img className="image-Paul" src={imgprofil} alt="image profil Paul"/>
                            <p>Paul</p>
                        </div>
                        <div className="part2">
                            <p id="scorePaul">26</p>
                            <img className="image-rocket" src={fussée} alt="image fussée"/>

                        </div>
                    </div>
                    <div className="Louis elem">
                        <div className="part1">
                            <img className="image-Louis" src={imgprofil} alt="image profil Louis"/>
                            <p>Louis</p>
                        </div>
                        <div className="part2">
                            <p id="scoreLouis">8</p>
                            <img className="image-rocket" src={fussée} alt="image fussée"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="textepage4 partie2">
                <div className="titrepage4">
                    <h4>Un suivi de tes relations </h4>
                </div>
                <div className="texte1page4">
                    <p>Chaque jour suplémentaire où tu vas avoir des conversations avec un ami iChat, un compteur sera mis en place. Ce dernier se nomme le iChat Score. Chaque jour le compteur s’incrémente pour connaître la durée de vos relations.</p>
                </div>
            </div>
        </div>
    </div>
    <div className="page5" id="page5style">
        <iframe className="video" src="https://www.youtube.com/embed/aZ07Su6thik" frameborder="0" autoplay></iframe>
    </div>
    <div className="page6">
        <div className="contenupage6">
            <p className="textep6">Pour suivre le projet</p>
            <a className="github-button" href="https://github.com/lucas-science/NSI-projet" data-color-scheme="no-preference: dark; light: dark; dark: dark;" data-size="large" data-show-count="true" aria-label="Star lucas-science/NSI-projet on GitHub">Star</a>
        </div>
    </div>



    <div className="top">
        <svg width="100%" viewBox="0 0 1920 109" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 46.3073C0 46.3073 167.456 -1.38451e-05 355.407 0C543.359 1.38451e-05 667.326 46.3073 836.782 46.3073C1006.24 46.3073 1031.23 -6.60386e-10 1148.7 0C1266.17 6.66595e-10 1384.64 47.9513 1504.61 46.3073C1624.58 44.6632 1655.07 0 1764.54 5.43532e-05C1892.51 0.000117889 1920 46.3073 1920 46.3073V109H0V46.3073Z" fill="#626672" fill-opacity="0.09"/>
        </svg>
    </div>
    <div className="page7 ">
        <div className="contenupage7 ">
            <div className="titre-superviser ">
                <div className="superviser ">
                    <p className="textesuperviser "> Projet supervisé par ....</p>
                    <img className="image-superviser " src={imgpage6} alt="image fleche"/>
                </div>
            </div>
            <div className="personne-superviser ">
                <div className="lucas ">
                    <img className="image-lucas " src={imgLucas} alt="image profil Lucas "/>
                    <a className="menu__link " href="#page8" data-hover="Lucas ">CV Lucas</a>
                </div>
                <div className="matthieu ">
                    <img className="image-matthieu" src={imgMatthieu} alt="image profil Matthieu "/>
                    <a className="menu__link " href="#page9 " data-hover="Matthieu">CV Matthieu</a>
                </div>
            </div>
        </div>
    </div>

    <div className="page8 " id="page8">
        <div className="contenupage8 ">
            <div className="colonegauchecv1 ">
                <img className="imagecv-lucas " src={imgLucas} alt="image profil Lucas "/>
                <div className="textegauchecv1 ">
                    <p>Nom : L'Homme</p>
                    <p>Prénom : Lucas</p>
                    <p>Âge : 16 ans</p>
                    <p>Numéro de Téléphone : 06.07.45.98.22</p>
                    <p>Adresse e-mail : lucas.lhomme@gmail.com</p>
                </div>
            </div>
            <div className="colonedroitecv1 ">
                <h2 className="titrecv1 ">Parcours scolaire</h2>
                <div className="textedroitecv1 ">
                    <li>
                        2016-2017 jusqu'à 2018/2019, collège du klosterwald Villé
                    </li>
                    <ul>
                        <li>
                            Brevet des collèges : Mention Très bien
                        </li>
                    </ul>
                    <li>
                        2019/2020 jusqu'à 2020/2021, lycée Polyvalent Jean-Baptiste Schwilgué
                        <ul style= {styles}>
                            <li>Enseignement de spécialité : </li>
                            <ul>
                                <li>Maths</li>
                                <li>Physique</li>
                                <li>Numérique et Science de l'Informatique</li>
                            </ul>
                        </ul>
                    </li>
                </div>
                <h2 className="titrecv1 ">Profil </h2>
                <p className="textedroitecv1 ">
                    Je suis actuellement au Schwilgué, en première général, étant interessé par les nouvelles technologies, mon choix a donc été influencé. De cette façon j'ai pris les enseignements de spécialités suivants: Maths, Physique, NSI. C'est pour cela que je souhaite
                    m'orienter vers un métier centré sur cette thématique.Durant mon temps libre je m'investis dans divers projets numériques. De plus je sais utiliser divers outils de bureautique tels, que la suite microsoft ou les logiciels de montage photo/vidéo.
                </p>
                <h2 className="titrecv1 ">Compétences</h2>
                <div className="competences-cv1 textedroitecv1 ">
                    <div>
                        <p>Coding</p>
                        <progress id="file" value="65" max="100"> 65% </progress>
                    </div>
                    <div>
                        <p>Photo montage</p>
                        <progress id="file" value="50" max="100"> 50% </progress>
                    </div>
                    <div>
                        <p>Créativité</p>
                        <progress id="file" value="80" max="100"> 50% </progress>
                    </div>
                </div>
                <h2 className="titrecv1 ">Loisirs</h2>
                <div className="textedroitecv1 ">
                    <li style= {styles}>Sport:</li>
                    <ul>
                        <li>Ski</li>
                        <li>Snowboard</li>
                        <li>Vélo</li>
                    </ul>
                    <li style= {styles}>Autre :</li>
                    <ul>
                        <li>pilotage de drone</li>
                        <li>programmation</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="page9" id="page9">
        <div class="contenupage9 ">
            <div class="colonedegauchecv2">
                <h2 class="titrecv2 ">Parcours scolaire</h2>
                <div class="textegauchecv2 ">
                    <li>
                        2016/2017 jusqu'à 2018/2019, collège du Bernstein Dambach-la-ville
                    </li>
                    <ul>
                        <li>
                            Brevet des collèges : Mention bien
                        </li>
                    </ul>
                    <li>
                        2019/2020 jusqu'à 2020/2021, lycée Polyvalent Jean-Baptiste Schwilgué
                        <ul style={styles}>
                            <li>Enseignement de spécialité : </li>
                            <ul>
                                <li>Maths</li>
                                <li>Physique</li>
                                <li>Numérique et Science de l'Informatique</li>
                            </ul>
                        </ul>
                    </li>
                </div>
                <h2 class="titrecv2 ">Profil </h2>
                <p class="textegauchecv2 "> Je suis actuellement en premiere générale au lycée Schwilgué de Sélestat .Ayant un profil scientifique, j'ai choisi les spécialités suivantes: Maths Physique et Nsi. Je voudrais m'orienter vers un métier dans le domaine de l'informatique.
                </p>
                <h2 class="titrecv2 ">Compétences</h2>
                <div class="competences-cv1 textedroitecv1">
                    <div>
                        <p>Coding</p>
                        <progress id="file" value="10" max="100"> 35% </progress>
                    </div>
                    <div>
                        <p>video montage</p>
                        <progress id="file" value="20" max="100"> 40% </progress>
                    </div>
                    <div>
                        <p>Créativité</p>
                        <progress id="file" value="50" max="100"> 60% </progress>
                    </div>
                </div>
                <h2 class="titrecv2 ">Loisirs</h2>
                <div class="textegauchecv2 ">
                    <li style={styles}>Sport:</li>
                    <ul>
                        <li>Football</li>
                        <li>Vélo</li>
                    </ul>
                    <li style={styles}>Autre :</li>
                    <ul>
                        <li>Jeux video</li>
                        <li>Pilotage de drone</li>
                    </ul>
                </div>
            </div>
            <div class="colonededroitecv2 ">
                <img class="imagecv-matthieu " src={imgMatthieu} alt="image profil Matthieu "/>
                <div class="textedroitecv2 ">
                    <p>Nom : Diebolt</p>
                    <p>Prénom : Matthieu</p>
                    <p>Âge : 16 ans</p>
                    <p>Numéro de téléphone : 06.47.55.58.32</p>
                    <p>Adresse e-mail : matthieu.diebolt@gmail.com</p>
                </div>
            </div>
        </div>
    </div>

    <footer>
        <div class="contenufooter ">
            <div class="footergauche ">
                <div class="logo-footer ">
                    <img class="logo-resaux " src={imglogotwitter} alt="logo Twitter "/>
                    <p>@iChatoff</p>
                </div>
                <div class="logo-footer ">
                    <img class="logo-resaux " src={imglogoinsta} alt="logo Instagram "/>
                    <p>@iChatoff</p>
                </div>
                <div class="logo-footer ">
                    <img class="logo-resaux " src={imglogogithub} alt="logo github "/>
                    <p>@iChatoff</p>
                </div>
            </div>
            <div class="footerdroite ">
                <p>Créer par : L’HOMME Lucas, Diebolt Matthieu</p>
                <p>Tout droit réservé copyright : Ichat © 2020</p>
                <div>
                    <img class="logoIchat-footer " src={logoichatblanc} alt="logo Ichat "/>
                </div>
            </div>
        </div>
    </footer>
    </div>
  );
}


const styles = {
    "list-style-type":"none"
  }
  
export default Home;

