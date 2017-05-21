import React from 'react';
const emojione = require('emojione');
var Message = React.createClass({
    componentWillMount() {

    },
    render: function() {
      function createEmote(message) {
        return {__html: ": " +  emojione.toImage(message)
      };
      }
        return (

          <div class="media message">


            <div class="media-body message-body">


              <div class="media">

                <span class="chat-username">
                  {this.props.message.user.isChatOwner ? <img src="/images/streamer-icon.png" class="streamer style-scope yt-live-chat-author-badge-renderer"></img> : null}
                 {this.props.message.user.isChatModerator ? <img src="/images/Moderator-icon.png" class="mod style-scope yt-live-chat-author-badge-renderer"></img> : null}
                 {this.props.message.user.isChatSponsor ? <img src="https://yt3.ggpht.com/egUeEEJTpKOlv3Rl3hTPdO52cK46oPhWKkl4G503EAhAswwDiwrt0UeFebUvaFYQttyvTSo2CQ=s16-nd" class="sub style-scope yt-live-chat-author-badge-renderer"></img> : null}
                 {this.props.message.user.displayName}

              </span>

                <span class="chatText" dangerouslySetInnerHTML={createEmote(this.props.message.message.displayMessage)}>

                </span>

              </div>


            </div>

          </div>

        )
    }
});

export default Message;
