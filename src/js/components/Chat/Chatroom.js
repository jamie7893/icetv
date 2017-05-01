import React from "react";
import cookie from 'react-cookie';
import Message from './Message';
import User from './User';
import ReactDOM from 'react-dom';
import {
  hashHistory
} from 'react-router';

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
      newMSG: 1,
      sinceScroll: 0
    }
  },
  _sendMsg(e) {
    if (cookie.load('id')) {
      e.preventDefault();
      $.ajax({
        type: 'POST',
        url: '/createMSG',
        data: {
          message: this.state.message.slice(0, 300),
          chatId: this.state.idChat,
          userId: cookie.load('id')
        }
      });
      this.setState({
        message: ""
      });
    } else {
      hashHistory.push('/login');
    }
  },
  _handleKeyPress(target) {
      if(target.charCode==13){
          target.preventDefault();
          this.sendBtn.click()
      }

  },
  _handleMsgInput(e) {
    this.setState({
      message: e.target.value
    })
  },
  componentDidMount() {
    var component = this;
    socket.on('messages', function(data) {
      if (!data.venue.name) {
        hashHistory.push('/checkin');
      }
      var doc = document.getElementById('chat');
      if (component.isMounted()) {

        if (data.messages.length !== component.state.messages.length && doc.scrollTop === (doc.scrollHeight - doc.offsetHeight)) {
          component.setState({
            newMSG: 1
          });
        } else if (component.state.newMSG === 1) {
          component.setState({
            newMSG: 0
          });
        }

        if (data.messages.length !== component.state.messages.length || data.users.length !== component.state.users.length) {
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
    if (!cookie.load('id')) {
      hashHistory.push('/login');
    } else {
      var component = this;
      socket.emit('joinedChat', {
        idUser: cookie.load('id')
      });
    }
  },

  _handleScroll() {
    // set current time of last scrollTop
    var time = new Date().getTime();
    this.setState({
      sinceScroll: new Date().getTime() / 1000 * 60
    });
  },
  componentDidUpdate() {
    if (this.state.newMSG === 1) {
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

        <iframe class="stream" width="1500" height="1000" src="https://www.youtube.com/embed/live_stream?channel=UCv9Edl_WbtbPeURPtFDo-uA&autoplay=1" frameBorder="0" allowFullScreen></iframe>
      <div id="right-colum">




      <div class = "chat" >
        <div>
          <div class = "panel panel-info" >

      <div id = "chat" class = "chatBox"
      onScroll = {
        this._handleScroll
      } >


      {
        this.state.messages.map((message) => {
          return (
            <
            Message
            message = {
              message
            }
            key = {
              message.id
            }
            />
        );
      })
    }

    <
    /div>







    <
    div class = "panel-footer" >




    <form>
      <div class = "chatFooter" >
        <textarea type = "text" class = "msgInput form-control"
            value = {
              this.state.message
            }
            onKeyPress={
              this._handleKeyPress
            }
            onChange = {
              this._handleMsgInput
            }
            placeholder = "Enter Message" / >

            <div class = "chatBtnContainer" >
              <button
                onClick = {
                  this._sendMsg
                }
                 ref={input => this.sendBtn = input}
                class = "chatBtn"
                type = "submit">Chat</button>



    <
    /div>




    <
    /div>




    <
    /form>




    <
    /div>




    <
    /div>




    <
    /div>




    <
    div class = "col-md-4 online-users" >




    <
    div class = "panel panel-primary" >




    <
    div class = "panel-heading" >
    ONLINE USERS <
    /div>




    <
    div class = "panel-body" >




    <
    ul class = "media-list" >




    {
      this.state.users.map((user) => {
        return (
          <
          User
          user = {
            user
          }
          key = {
            user.idUser
          }
          />
      );
    })
  }

  <
  /ul>




  <
  /div>




  <
  /div>





  <
  /div>




  <
  /div>




  <
  /div>




  <
  div >





  <
  /div>




  <
  /div>
);
},

});

export default Chat;
