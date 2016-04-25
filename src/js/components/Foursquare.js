import React from "react";
import Checkin from "./Foursquare/Checkin";
import Navbar from "./Navbar/Navbar.js";
import {hashHistory} from 'react-router';
import cookie from 'react-cookie';

var Login = React.createClass({

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

          <Checkin />
      </div>
    </div>
    );
  }
});

export default Login;
