import React from 'react';
const { EmoteFetcher, EmoteParser } = require('twitch-emoticons');
const fetcher = new EmoteFetcher();
const parser = new EmoteParser(fetcher, {
    type: 'html',
    match: /\b(.+?)\b/gi
});
var Message = React.createClass({
    componentWillMount() {
      fetcher.fetchTwitchEmotes().then(() => {
               let message = parser.parse(this.props.message.message.displayMessage)
               fetcher.fetchBTTVEmotes().then(() => {
               message = parser.parse(message)
               this.props.message.message.displayMessage = message
               }).catch(function(err) {
                 console.log(err)
               });
             }).catch(function(err) {

             })
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

                 {this.props.message.user.isChatSponsor ? <img src="https://yt3.ggpht.com/egUeEEJTpKOlv3Rl3hTPdO52cK46oPhWKkl4G503EAhAswwDiwrt0UeFebUvaFYQttyvTSo2CQ=s16-nd" class="style-scope yt-live-chat-author-badge-renderer"></img> : null}
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
