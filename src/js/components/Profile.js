import React from "react";
import Form from "./Profile/Form";
import Navbar from "./Navbar/Navbar.js";

var Profile = React.createClass({

  render: function() {
    return (
      <div>
        <Navbar />
      <div class="formFlex">


        <Form />


      </div>
    </div>
    );
  }
});

export default Profile;
