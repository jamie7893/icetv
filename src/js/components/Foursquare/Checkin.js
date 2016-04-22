import React from "react";
import Venue from "./Venue.js";


var Checkin = React.createClass({

  getInitialState: function () {
    return {
      venues: []
    }
  },

  componentWillMount: function() {
     navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) =>
       $.ajax({
         type: 'GET',
         url: `https://api.foursquare.com/v2/venues/explore/?client_id=AL4DDIM5HHXXYV1HKMQBGFLFIJRHJVPR4BI4CJ0VQIN4PHGZ&client_secret=VXRH3J0QWAJKGIPHMEIOWWR3YSADCO3S2IJQMS3BNVEDFYUE&v=20130815&ll=${latitude},${longitude}&radius=100`,
       }).then(({response: {groups}}) => {
           const venues = groups[0].items
                         .map(x => x.venue)
                         .filter(v => v.id);
           this.setState({venues})
       }),
       function error(msg) {
                console.log(msg);
            })
   },

   componentDidMount: function() {
      navigator.geolocation.watchPosition(({coords: {latitude, longitude}}) =>
        $.ajax({
          type: 'GET',
          url: `https://api.foursquare.com/v2/venues/explore/?client_id=AL4DDIM5HHXXYV1HKMQBGFLFIJRHJVPR4BI4CJ0VQIN4PHGZ&client_secret=VXRH3J0QWAJKGIPHMEIOWWR3YSADCO3S2IJQMS3BNVEDFYUE&v=20130815&ll=${latitude},${longitude}&radius=100`,
        }).then(({response: {groups}}) => {
            const venues = groups[0].items
                          .map(x => x.venue)
                          .filter(v => v.id);
            this.setState({venues})
        }),
        function error(msg) {
                 console.log(msg);
             }, {
               frequency: 2 * 60 * 1000,
               timeout : 2.5 * 60 * 1000,
                 enableHighAccuracy: true
             });
    },

  render: function() {
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
