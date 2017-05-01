import React from 'react';


var Message = React.createClass({




    render: function() {
  //     <span class="chat-time">
  //   {this.props.message.createdAt.split("T")[1].slice(0, this.props.message.createdAt.split("T")[1].indexOf("."))}
  // </span>
        return (

          <div class="media message" >


            <div class="media-body message-body">


              <div class="media">

                <span class="chat-username">

                  {this.props.message.username}

              </span>

                <span class="chatText">
                    : {this.props.message.message}
                </span>

              </div>


            </div>

          </div>

        )
    }
});

export default Message;
