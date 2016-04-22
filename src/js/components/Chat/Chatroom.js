import React from "react";
import cookie from 'react-cookie';
import Message from './Message'

var socket = io('http://localhost:1738');

var Chat = React.createClass({

  getInitialState: function () {
    return {
      idChat: "",
      users: [],
      messages: [],
      message: ""
    }
  },

  _sendMsg(e){
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
  },
  _handleMsgInput(e) {
    this.setState({
      message: e.target.value
    })
  },
  componentDidMount() {
    var component = this;
    socket.on('messages', function(data) {
      console.log(data);
      component.setState({
        messages: data.messages,
        idChat: data.idChat

      });

    });

  },

  componentWillMount() {
    var component = this;
    socket.emit('joinedChat', {
      idUser: cookie.load('id')
    });
  },

  render: function() {
    return (
      <div>

        <div  >

          <img >
          </img>

        </div>

        <div class="container">

          <div class="row " >

            <h3 class="text-center">
              {this.state.venue}
            </h3>

            <br />

            <br />

            <div class="col-md-8">

              <div class="panel panel-info">

                <div class="panel-heading">
                  RECENT CHAT HISTORY
                </div>

                <div  class="panel-body" >

                  <ul class="media-list">

                    { this.state.messages.map((message) => {
                      return (
                        <Message message={message} key={message.id}/>
                      );
                    })}

                  </ul>

                </div>

                <div class="panel-footer">

                  <form >

                    <div class="input-group">


                      <input
                        type="text"
                        class="form-control"
                        value={this.state.message}
                        onChange={this._handleMsgInput}
                        placeholder="Enter Message" />

                      <span class="input-group-btn">

                        <span >
                        </span>

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


                    <li class="media" >


                      <div class="media-body">


                        <div class="media">

                          <a class="pull-left" href="#">

                            <img class="media-object img-circle" src="" />

                          </a>

                          <div class="media-body">

                            <h5>  | User </h5>


                            <small class="text-muted">
                              <b>Online</b>
                            </small>

                          </div>

                        </div>


                      </div>

                    </li>

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
  }
});

export default Chat;
