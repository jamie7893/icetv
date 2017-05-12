import React from "react";
import Form from "./Login/Form";
import Navbar from "./Navbar/Navbar.js";

var Login = React.createClass({

  render: function() {
    return (
      <div id="login">
            <Navbar />
        <div id="stream">
        <iframe class="stream" class="login-stream" width="1500" height="1000" src="https://www.youtube.com/embed/live_stream?channel=UCv9Edl_WbtbPeURPtFDo-uA&autoplay=1" frameBorder="0" allowFullScreen></iframe>
        </div>
        <Form />
        

    </div>
    );
  }
});

export default Login;
