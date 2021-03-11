import React, { Component } from 'react';
import '../style/app.css'


export default class friend_nom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nom:'',
            id:''
        };
      }
    componentDidMount(){
        fetch('http://localhost:4000/app/getFriendName', {
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
            fetch('http://localhost:4000/app/getFriendName', {
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
            <p>
                {this.state.nom}
            </p>
        );
    }
}