import React from "react";
import Chat from "./Chat/Chatroom";
import Navbar from "./Navbar/Navbar.js";

var Chatroom = React.createClass({

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
