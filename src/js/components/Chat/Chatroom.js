import React from "react";
import cookie from 'react-cookie';
import Message from './Message';
import User from './User';
import ReactDOM from 'react-dom';
import ScrollArea from 'react-scrollbar';
import {hashHistory} from 'react-router';

var socket = io();
var Chat = React.createClass({
  getInitialState() {
    return {
      idChat: "",
      users: [],
      messages: [],
      message: "",
      venue: {}
    }
  },
  componentDidUpdate: function() {

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
        if(component.isMounted()) {
      component.setState({
        messages: data.messages,
        idChat: data.idChat,
        users: data.users,
        venue: data.venue
      });
    }
    });

  },
  componentWillMount() {
    var component = this;
    socket.emit('joinedChat', {
      idUser: cookie.load('id')
    });

  },
  recreateNode(el, withChildren) {
  if (withChildren) {
    el.parentNode.replaceChild(el.cloneNode(true), el);
  } else {
    var newEl = el.cloneNode(false);
    while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
    el.parentNode.replaceChild(newEl, el);
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
console.log(hashHistory);
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



                <ScrollArea
             speed={0.8}
             className="chatBox"
             contentClassName="content"
             horizontal={false}
             >
                    { this.state.messages.map((message) => {
                      return (
                        <Message ref="msg" message={message} key={message.id}/>
                      );
                    })}

                </ScrollArea>





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
