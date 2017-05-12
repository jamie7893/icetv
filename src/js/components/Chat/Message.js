import React from 'react';


var Message = React.createClass({




    render: function() {
  //     <span class="chat-time">
  //   {this.props.message.createdAt.split("T")[1].slice(0, this.props.message.createdAt.split("T")[1].indexOf("."))}
  // </span>
        return (

          <div class="media message">


            <div class="media-body message-body">


              <div class="media">

                <span class="chat-username">

                 {this.props.message.user.isChatSponsor ? <img src="https://yt3.ggpht.com/egUeEEJTpKOlv3Rl3hTPdO52cK46oPhWKkl4G503EAhAswwDiwrt0UeFebUvaFYQttyvTSo2CQ=s16-nd" class="style-scope yt-live-chat-author-badge-renderer"></img> : null}
                 {this.props.message.user.displayName}

              </span>

                <span class="chatText">
                    : {this.props.message.message.displayMessage}
                </span>

              </div>


            </div>

          </div>

        )
    }
});

export default Message;
