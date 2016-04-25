import React from "react";
import Checkin from "./Foursquare/Checkin";
import Navbar from "./Navbar/Navbar.js";

var Login = React.createClass({

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
