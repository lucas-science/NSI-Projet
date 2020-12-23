import React, { Component } from 'react';
import axios from 'axios';

export default class login extends Component {
    constructor(props) {
      super(props)
      this.state = {
        email : '',
        mdp: '',
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
      console.log("state login : ",this.state)
      fetch('http://localhost:4000/authentification/signin', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          email:this.state.email,
          mdp:this.state.mdp
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if (res.status === 200) {
          this.props.history.push('/');
        }if (res.status === 401){
          this.setState({message:'Mot de passee incorrecte'});
        } 
        else {
          this.setState({message:'Mot de passe ou email incorrecte'});
        }
      })
    }
  
    render() {
      return (
        <div>
        <form onSubmit={this.onSubmit}>
                    <h1>Login Below!</h1>
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