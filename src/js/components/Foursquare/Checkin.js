import React from "react";
import Venue from "./Venue.js";


var Checkin = React.createClass({

  getInitialState: function () {
    return {
      venues: []
    }
  },

  _componentWillMount: function() {
     navigator.geolocation.watchPosition(({coords: {latitude, longitude}}) =>
       $.ajax({
         type: 'GET',
         url: `https://api.foursquare.com/v2/venues/explore/?client_id=AL4DDIM5HHXXYV1HKMQBGFLFIJRHJVPR4BI4CJ0VQIN4PHGZ&client_secret=VXRH3J0QWAJKGIPHMEIOWWR3YSADCO3S2IJQMS3BNVEDFYUE&v=20130815&ll=${latitude},${longitude}&radius=800`,
       }).then(({response: {groups}}) => {
           const venues = groups[0].items
                         .map(x => x.venue)
                         .filter(v => v.id);
           this.setState({venues})
       }),
       function error(msg) {
                console.log(msg);
            }, {
              frequency: 15 * 60 * 1000,
              timeout : 1 * 60 * 1000,
                enableHighAccuracy: true
            });
   },

  render: function() {
    this._componentWillMount();
    return (
      <div class="foursq">



        <h2> Places around you:</h2>




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
