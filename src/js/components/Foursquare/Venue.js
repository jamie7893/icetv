import React from 'react';
import cookie from 'react-cookie';
import {hashHistory} from 'react-router';

var socket = io('http://localhost:1738');
var Venue = React.createClass({

  _joinChat: function() {
    var joinChat = {
      idChat: this.props.venue.id,
      idUser: cookie.load('id')
    };

    $.ajax({
      type: 'POST',
      url: '/joinchat',
        data: joinChat,
    }).then((data) => {
      hashHistory.push('/chatroom');
    });

    socket.emit('venue', {
      venue: this.props.venue
    });
  },

    render: function() {
        return (
                <li class="venue" >
                  <p class="theVenue">
                    <br />
                    {this.props.venue.name}
                    <br /> {this.props.venue.location.address}
                    <br /> {this.props.venue.location.city}, {this.props.venue.location.state} {this.props.venue.location.postalCode}
                    <br />{this.props.venue.contact.formattedPhone}

                    <button onClick={this._joinChat} class="default-btn" >Join Chat</button>
                    <br />  <br />
                </p>
                </li>

        )
    }
});

export default Venue;
