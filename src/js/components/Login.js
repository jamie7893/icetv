import React from "react";
import Form from "./Login/Form";
import Navbar from "./Navbar/Navbar.js";
import Message from './Chat/Message';
var socket;
if (window.location.hostname.search('localhost') !== -1) {
  socket = io('localhost:1738');
} else {
  socket = io("/");
}
var Login = React.createClass({
  getInitialState() {
    return {
      idChat: "",
      users: [],
      messages: [],
      message: "",
      venue: {},
      newMSG: 1,
      sinceScroll: 0
    }
  },
  componentDidMount() {
    let component = this;
    socket.on("message", function(data) {
      component.setState({
        messages: component.state.messages.slice(-200).concat([data])
      });
    });
  },
  render: function() {
    return (
      <div id="login">
            <Navbar />
        <div id="stream">
        <iframe class="stream" class="login-stream" width="1500" height="1000" src="https://www.youtube.com/embed/live_stream?channel=UCv9Edl_WbtbPeURPtFDo-uA&autoplay=1" frameBorder="0" allowFullScreen></iframe>
        </div>
        <div id="right-colum">

          <div class="chat">
            <div>
              <div class="panel panel-info">

                <div id="chat" class="chatBox" onScroll={this._handleScroll}>

                  {this.state.messages.map((message, i) => {
                    return (< Message message = {
                      message
                    }
                    key = {
                      i
                    } />);
                  })
}

                  </div>

                    <div class="panel-footer">

                      <form>
                        <div class="chatFooter">
                          Want to chat?
                           <button class="loginBtn loginBtn--google" >
                                <a class="btn-txt" href="/auth/youtube">Login with Youtube</a>
                            </button>

                              </div>

                                </form>

                                  </div>

                                    </div>

                                      </div>

                                                      </div>

                                                        </div>


    </div>
    );
  }
});

export default Login;
