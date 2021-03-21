import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style/barre-amis-gauche.css';



export default class barregaucheamis extends Component {
    constructor(props) {
        super(props)
        this.state = {
          friend : '',
          message : '',
          amislist: [{_id:0, _pseudo:""}],
          user_nom : ''
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
          //console.log(response)
          this.setState({amislist:response.friends})
          this.setState({user_nom:response.pseudo})
          //console.log("state", this.state.amislist, this.state.user_nom)
        })
      }

    render(){
       return(
         <div class="liste-amis-gauche">
           <div class="friend-list-gauche">
        <div >
          {this.state.amislist.map((amis)=>(
            <Link to={"/app2/"+amis._id}>
                <div className="friend-list-gauche-amis" name={amis._pseudo}>
                    <p>{amis._pseudo}</p>
                </div>
            </Link>
          ))} 
        </div>
           </div>
           </div>
       );
   }

}