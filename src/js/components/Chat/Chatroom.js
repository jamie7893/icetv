import React from "react";
import cookie from 'react-cookie';
import Message from './Message';
import User from './User';
import ReactDOM from 'react-dom';
import Infinite from 'react-infinite';
import {hashHistory} from 'react-router';

var socket = io();
var Chat = React.createClass({
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
  _sendMsg(e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/createMSG',
      data: {
        message: this.state.message,
        chatId: this.state.idChat,
        userId: cookie.load('id')
      }
    });
    this.setState({
      message: ""
    });
  },

  _handleMsgInput(e) {
    this.setState({
      message: e.target.value
    })
  },
  componentDidMount() {
    var component = this;
    socket.on('messages', function(data) {
      var doc = document.getElementById('chat');
      if(component.isMounted()) {
        if(data.messages.length !== component.state.messages.length && doc.scrollTop === (doc.scrollHeight - doc.offsetHeight)) {
        component.setState({
          newMSG: 1
        });
      } else if(component.state.newMSG === 1){
        component.setState({
          newMSG: 0
        });
      }
      if(data.messages.length !== component.state.messages.length) {
        component.setState({
          messages: data.messages,
          idChat: data.idChat,
          users: data.users,
          venue: data.venue
        });
      }
    }
    });

  },
  componentWillMount() {
    var component = this;
    socket.emit('joinedChat', {
      idUser: cookie.load('id')
    });
  },

  _handleScroll() {
    // set current time of last scrollTop
    var time = new Date().getTime();
    this.setState({
      sinceScroll: new Date().getTime() / 1000 * 60
    });
  },
  componentDidUpdate() {
    if(this.state.newMSG === 1) {
      document.getElementById('chat').scrollTop = document.getElementById('chat').scrollHeight;
    }
  },

  componentWillUnmount() {
    var component = this;
    if (this.state.users.length === 1) {
      socket.emit('destroyChat', {
        idChat: this.state.idChat
      });
    } else {
      socket.emit('leaveChat', {
        idUser: cookie.load('id')
      });
    }
    component.forceUpdate();
    socket.removeListener();
  },

  render() {
    return (
      <div>



        <div>



          <img />



        </div>



        <div class="container">



          <div class="row " >



            <h3 class="text-center">


              {this.state.venue.name}
            </h3>



            <br />



            <br />



            <div class="col-md-8">



              <div class="panel panel-info">



                <div class="panel-heading">
                  RECENT CHAT HISTORY
                </div>




                <div id="chat" class="chatBox" onScroll={this._handleScroll}>

                  { this.state.messages.map((message) => {
                    return (
                      <Message
                        message={message}
                        key={message.id}/>
                    );
                  })}

                </div>






                <div class="panel-footer">



                  <form >



                    <div class="input-group">




                      <input
                        type="text"
                        class="msgInput form-control"
                        value={this.state.message}
                        onChange={this._handleMsgInput}
                        placeholder="Enter Message" />



                      <span class="input-group-btn">



                        <button
                          onClick={this._sendMsg}
                          class="btn btn-custom"
                          type="submit">SEND</button>



                      </span>



                    </div>



                  </form>



                </div>



              </div>



            </div>



            <div class="col-md-4">



              <div class="panel panel-primary">



                <div class="panel-heading">
                  ONLINE USERS
                </div>



                <div class="panel-body">



                  <ul class="media-list">



                    { this.state.users.map((user) => {
                      return (
                        <User user={user} key={user.idUser}/>
                      );
                    })}

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
