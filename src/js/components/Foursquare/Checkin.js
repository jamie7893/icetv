import React from "react";
import Venue from "./Venue.js";
import {hashHistory} from 'react-router';
import cookie from 'react-cookie';

var Checkin = React.createClass({

  getInitialState: function () {
    return {
      venues: [],
      longitude: 0,
      latitude: 0
    }
  },

  componentWillMount() {
    if (!cookie.load('id')) {
       hashHistory.push('/login');
    } else {
    var location = navigator.geolocation.watchPosition(({coords: {latitude, longitude}}) =>
      $.ajax({
        type: 'GET',
        url: `https://api.foursquare.com/v2/venues/explore/?client_id=AL4DDIM5HHXXYV1HKMQBGFLFIJRHJVPR4BI4CJ0VQIN4PHGZ&client_secret=VXRH3J0QWAJKGIPHMEIOWWR3YSADCO3S2IJQMS3BNVEDFYUE&v=20130815&ll=${latitude},${longitude}&radius=300`,
      }).then(({response: {groups}}) => {
        console.log(groups);
          const venues = groups[0].items
                        .map(x => x.venue)
                        .filter(v => v.id);
          this.setState({venues, latitude, longitude})
      }),
      function error(msg) {
               console.log(msg);
           }, {
             frequency: 2 * 60 * 1000,
             timeout : 2.5 * 60 * 1000,
               enableHighAccuracy: true
           });
           this.setState({
             "location": location
           });
         }
  },

componentWillUnmount() {
  navigator.geolocation.clearWatch(this.state.location);
},
  render: function() {
    return (
      <div class="foursq">



        <h2 class="places">Where are you?</h2>




        <div class="venueBox">


          <ul>


            { this.state.venues.map((venue) => {
              return <Venue venue={venue} key={venue.id} />
            })}
          </ul>



        </div>




      </div>

    );
  }
});

export default Checkin;
