import React from 'react';

var Venue = React.createClass({

    render: function() {

        return (
                <li class="venue" >
                  <p class="theVenue">
                    <br />
                    {this.props.venue.name}
                    <br /> {this.props.venue.location.address}
                    <br /> {this.props.venue.location.city}, {this.props.venue.location.state} {this.props.venue.location.postalCode}
                    <br />{this.props.venue.contact.formattedPhone}

                    <button  class="default-btn" >Join Chat</button>
                    <br />  <br />
                </p>
                </li>

        )
    }
});

export default Venue;
