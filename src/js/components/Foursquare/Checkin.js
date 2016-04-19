import React from "react";



var Checkin = React.createClass({

  _getLocation: function() {
    navigator.geolocation.getCurrentPosition(function(position) {
        this.state.lat = position.coords.latitude;
        this.state.long = position.coords.longitude;
        $http({
            method: 'GET',
            url: 'https://api.foursquare.com/v2/venues/explore/?client_id=AL4DDIM5HHXXYV1HKMQBGFLFIJRHJVPR4BI4CJ0VQIN4PHGZ&client_secret=VXRH3J0QWAJKGIPHMEIOWWR3YSADCO3S2IJQMS3BNVEDFYUE&v=20130815&ll=' + this.state.lat + ',' + this.state.long + '&radius=800'
        }).then(function successCallback(response) {
            this.state.venue = [];
                response.data.response.groups[0].items.map((venues) => {
                  venues.map((venue) => {
                    if (venue.id) {
                        var aVenue = {};
                        aVenue.id = venue.id;
                        aVenue.name = venue.name;
                        aVenue.location = venue.location;
                        aVenue.contact = venue.contact;
                        this.state.venue.push(aVenue);
                    }
                });
            });
        });
  });
},

  render: function() {
    return (
      <div class="foursq">
      <h2> Places around you:</h2>



      <div class="foursquare">

        <div class="venueBox">
          <ul>
            <li class="venue" ng-repeat="venue in venue track by $index">
              <p class="theVenue">
                <br />


                <button  class="default-btn" >Join Chat</button>
                <br />  <br />
            </p>
            </li>
          </ul>
        </div>
      </div>

      </div>

    );
  }
});

export default Checkin;
