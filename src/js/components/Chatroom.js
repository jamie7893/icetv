import React from "react";
import Chat from "./Chat/Chatroom";
import Navbar from "./Navbar/Navbar.js";
import {hashHistory} from 'react-router';
import cookie from 'react-cookie';

var Chatroom = React.createClass({

  componentWillMount() {
    if(!cookie.load('id')) {
      hashHistory.push('/login');
    }
  },

  render: function() {
    return (
      <div>

        <Navbar />
        
        <div>

          <Chat />

        </div>

      </div>
    );
  }
});

export default Chatroom;
