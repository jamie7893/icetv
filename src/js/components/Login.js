import React from "react";
import Form from "./Login/Form";
import Navbar from "./Navbar/Navbar.js";
import Message from './Chat/Message';
var socket;
const { EmoteFetcher, EmoteParser } = require('twitch-emoticons');
const fetcher = new EmoteFetcher();
const parser = new EmoteParser(fetcher, {
    type: 'html',
    match: /\b(.+?)\b/gi
});
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
    fetcher.fetchTwitchEmotes().then(() => {
           fetcher.fetchBTTVEmotes().then(() => {
      socket.on("message", function(data) {
      var doc = document.getElementById('chat');
            data.message.displayMessage  = parser.parse(data.message.displayMessage)
             component.setState({
               messages: component.state.messages.slice(-200).concat([data])
             });
           });
             }).catch(function(err) {
               console.log(err)
             });
           }).catch(function(err) {

           })
  },
  componentDidUpdate() {
    if (this.state.newMSG === 1) {
      document.getElementById('chat').scrollTop = document.getElementById('chat').scrollHeight;
    }
  },
  componentWillUnmount() {
    var component = this;
    component.forceUpdate();
    socket.removeListener();
  },
  _handleBottomCheckbox(e) {
    let component = this;
    if (e.target.checked) {
      component.setState({
        newMSG: 0
      });
    } else {
      component.setState({
        newMSG: 1
      });
    }
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
                      <input type="checkbox" id="scrollToBottom" onClick={this._handleBottomCheckbox}></input>
                      <label for="scrollToBottom">Don't scroll to bottom</label>
                      <form>
                        <div class="chatFooter">
                          <span class="toChat">Want to chat?</span>
                           <button class="loginBtn-chat loginBtn--google" >
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
