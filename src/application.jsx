import React, { Component } from 'react';
import './style/app.css';
import FriendPannel from './components/friendpanel';
import Chat from './components/chat';


export default class login extends Component {
    render() {
      return (
        <div className="corps">
          <FriendPannel/>
          <Chat/>
        </div>
      ); 
    }
  }