import React, { Component } from 'react';
import axios from 'axios';

export default class signup extends Component {
    constructor(props) {
      super(props)
      this.state = {
        email : '',
        mdp: '',
        pseudo:'',
        message:''
      };
    }
  
    handleInputChange = (event) => {
      const { value, name } = event.target;
      this.setState({
        [name]: value
      });
    }
  
    onSubmit = (event) => {
      event.preventDefault();
      console.log("state signup : ",this.state);
      /*axios.post('http://localhost:4000/authentification/signup',{
        pseudo:this.state.pseudo,
        email:this.state.email,
        mdp:this.state.mdp,
      })  
      .then((value) => {
        console.log(value);
      })*/
      fetch('http://localhost:4000/authentification/signup', {
        method: 'POST',
        body: JSON.stringify({
          pseudo:this.state.pseudo,
          email:this.state.email,
          mdp:this.state.mdp
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((value) => {
        if (value.status === 200) {
          this.props.history.push('/');
          console.log("info envoyé");
        } else {
          this.setState({message:'Pseudo ou email déjà utilisé'});
        }
      })


     /* .then(res => {
        if (res.status === 200) {
          this.props.history.push('/');
          console.log("info envoyé")
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error logging in please try again');
      });
      */
    }
  
    render() {
      return (
        <div>
          <form onSubmit={this.onSubmit}>
          <h1>Login Below!</h1>
          <input
            type="text"
            name="pseudo"
            placeholder="Enter pseudo"
            value={this.state.pseudo}
            onChange={this.handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={this.state.email}
            onChange={this.handleInputChange}
            required
          />
          <input
            type="password"
            name="mdp"
            placeholder="Enter password"
            value={this.state.mdp}
            onChange={this.handleInputChange}
            required
          />
          <input type="submit" value="Submit"/>
        </form>
        <p>{this.state.message}</p>
        </div>
      );

    }
  }