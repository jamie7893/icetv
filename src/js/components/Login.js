import React from "react";
import Image from "./Register/Image";
import Form from "./Login/Form";


var Login = React.createClass({

  render: function() {
    return (
      <div class="formFlex">


        <Image image="http://joost.vunderink.net/blog/wp-content/uploads/2013/11/groupchat.jpeg"/>


        <Form />


      </div>
    );
  }
});

export default Login;
