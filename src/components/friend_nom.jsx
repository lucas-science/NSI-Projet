import React, { Component } from 'react';


export default class friend_nom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nom:'',
            id:''
        };
      }
    componentDidMount(){
        fetch('https://ichatt.herokuapp.com/app/getFriendName', {
          method: 'POST',
          // credentials : include permet d'intégrer les cookie avec la requête
          credentials: 'include', 
          body: JSON.stringify({
            name: this.props.id
          }),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        .then(response => response.json())
        .then(response => {
            this.setState({nom:response})
            this.setState({id:this.props.id})
        })
    }
    componentDidUpdate(){
        if(this.state.id != this.props.id){
            fetch('https://ichatt.herokuapp.com/app/getFriendName', {
                method: 'POST',
                // credentials : include permet d'intégrer les cookie avec la requête
                credentials: 'include', 
                body: JSON.stringify({
                  name: this.props.id
                }),
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                }
              })
              .then(response => response.json())
              .then(response => {
                  this.setState({nom:response})
                  this.setState({id:this.props.id})
              })
        }
    }
    render(){
        return(
            <p className="barre-du-haut-amis-texte">
                {this.state.nom}
            </p>

        );
    }
}