import React from "react";
import cookie from 'react-cookie';
import Message from './Message';
import User from './User';
import ReactDOM from 'react-dom';
import {hashHistory} from 'react-router';
const { EmoteFetcher, EmoteParser } = require('twitch-emoticons');
const fetcher = new EmoteFetcher();
const parser = new EmoteParser(fetcher, {
    type: 'html',
    match: /\b(.+?)\b/gi
});
var socket;
if (window.location.hostname.search('localhost') !== -1) {
  socket = io('localhost:1738');
} else {
  socket = io("/");
}
var Chat = React.createClass({
  getInitialState() {
    return {
      idChat: "",
      users: [],
      messages: [],
      message: "",
      venue: {},
      newMSG: 1 ,
      sinceScroll: 0
    }
  },
  _sendMsg(e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/message',
      data: {
        message: this.state.message.slice(0, 300)
      }
    });

    this.setState({message: ""});
  },
  _handleKeyPress(target) {
    if (target.charCode == 13) {
      target.preventDefault();
      this.sendBtn.click()
    }

  },
  _handleMsgInput(e) {
    this.setState({message: e.target.value})
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
  componentDidMount() {
    var component = this;

      if(component.isMounted()) {
      $.ajax({
       type: 'GET',
       url: '/refreshToken'
     }).then(function(data) {
       if (data.redirect) {
         window.location.href = "/auth/youtube";
       }
     })



    //  socket.emit("joinedChat", {
    //    username: cookie.load('username')
    //  });

    setInterval(function() {
      $.ajax({type: 'GET', url: '/refreshToken'});
    }, 60000 * 59)

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

  }
  },
  componentWillMount() {
    var component = this;
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

  render() {
    return (
      <div>

        <iframe class="stream" width="1500" height="1000" src="https://www.youtube.com/embed/live_stream?channel=UCv9Edl_WbtbPeURPtFDo-uA&autoplay=1" frameBorder="0" allowFullScreen></iframe>
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
                          <textarea type="text" class="msgInput form-control" value={this.state.message} onKeyPress={this._handleKeyPress} onChange={this._handleMsgInput} placeholder="Enter Message"/>
                          <div class="chatBtnContainer">
                            <button onClick={this._sendMsg} ref={input => this.sendBtn = input} class="chatBtn" type="submit">Chat</button>
                          </div>
                        </div>

                      </form>

                    </div>

                  </div>

                </div>

              <div class="col-md-4 online-users">

                    <div class="panel panel-primary">

                                            <div class="panel-heading">
                                              ONLINE USERS
                                            </div>

                                            <div class = "panel-body">
                                              <ul class = "media-list" > {this.state.users.map((user) => {
                                                return (< User user = {
                                                  user
                                                }
                                                key = {
                                                  user.idUser
                                                } />);
                                              })
}

                                              </ul>

                                                </div>

                                                  </div>

                                                    </div>

                                                      </div>

                                                        </div>

                                                          <div>

                                                            </div>

                                                              </div>

                                                            );
},

});

export default Chat;
