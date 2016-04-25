import React from "react";



var Navbar = React.createClass({

  render: function() {
    return (
      <nav class="navbar navbar-default navbar-inverse" role="navigation" >
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>

          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li><a href="#/chatroom">ChatRoom</a></li>
              <li><a href="#/checkin" >Check-in</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <li>
                <a href="#/profile" >Profile</a>
              </li>
              <li>
                <a  href="/logout" >Logout</a>
              </li>
            </ul>
          </div>

        </div>

      </nav>

    );
  }
});

export default Navbar;
