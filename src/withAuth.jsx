import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    // création du state "loading" et "redirect"
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }

    // fait une requête POST au chemin "http://localhost:4000/auth" pour vérifier si les cookie sont valide
    componentDidMount() {
      fetch('https://ichatt.herokuapp.com/auth',{
        // credentials : include permet d'intégrer les cookie avec la requête
        credentials: 'include', 
        method: 'POST'
      })
        .then(res => {
            console.log(res)
          if (res.status === 200) {
          // si les cookies sont valide
            console.log("les cookie sont la ")
            this.setState({ loading: false });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false, redirect: true });
        });
    }

    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      // si redirect est TRUE renvoyer vers la page de connexion
      if (redirect) {
        return <Redirect to="/login" />;
      }
      // si redirect est FALSE renvoyer le composant voulu
      return <ComponentToProtect {...this.props} />;
    }
  }
}