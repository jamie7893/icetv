import React from "react";
import Form from "./Profile/Form";
import Navbar from "./Navbar/Navbar.js";
import {hashHistory} from 'react-router';
import cookie from 'react-cookie';

var Profile = React.createClass({

    componentWillMount() {
      if(!cookie.load('id')) {
        hashHistory.push('/login');
      }
    },

  render: function() {
    return (
      <div>
        <Navbar />
      <div class="form-profile">


        <Form />


      </div>
    </div>
    );
  }
});

export default Profile;
