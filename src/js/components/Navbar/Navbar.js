import React from "react";
let Logout = React.createClass({
  render: function() {
    return (
          <a class="btn-txt donateBtn" href="/logout">Logout</a>
    )
  }
})
let Login = React.createClass({
  render: function() {
    return (
            <a class="btn-txt loginBtn loginBtn--google" href="/auth/youtube">Login with Youtube</a>
    )
  }
})
let Navbar = React.createClass({
  getInitialState: function () {
    return {
      email: "",
      password: "",
      showLogin: true,
      showLogout: false
    }
  },
  _handlePasswordInput: function (event) {
    this.setState({
      password: event.target.value
    });
  },
  _handleEmailInput: function (event) {
    this.setState({
      email: event.target.value
    });
  },
  _handleLogin() {
    let component = this;
    $.ajax({
      type: "POST",
      url: '/login',
      data: {
        "email": component.state.email,
        "password": component.state.password
      },
      success: function(info) {
          var joinChat = {
            idChat: "ice_poseidon",
            idUser: cookie.load('id')
          };

          $.ajax({
            type: 'POST',
            url: '/joinchat',
              data: joinChat,
          }).then((data) => {
            hashHistory.push('/chatroom');
          });
      }
    });
  },
  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: '/isLoggedIn'
    }).then((data) => {
      console.log(data)
      this.setState({
        showLogin: data.showLogin,
        showLogout: data.showLogout
      })
    });
  },
  render: function() {
    return (
  <header>
  <nav class="navbar navbar-default navbar-inverse" role="navigation">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav navbar-left">
            <a class="btn-txt donateBtn" target="_blank" href="https://discordapp.com/invite/cx">Discord</a>
            <a class="btn-txt donateBtn" target="_blank" href="https://twitter.com/REALIcePoseidon">Twitter</a>
            <a class="btn-txt donateBtn" target="_blank" href="https://shop.crowdmade.com/collections/iceposeidon/style_tshirt">Buy a shirt!</a>
            <a class="btn-txt donateBtn" target="_blank" href="https://www.reddit.com/r/Ice_Poseidon/">Reddit</a>
            <a class="btn-txt donateBtn" target="_blank" href="https://oddshot.tv/">Oddshot</a>
            <a class="btn-txt donateBtn" target="_blank" href="https://youtube.streamlabs.com/iceposeidon#/">Donate</a>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          {this.state.showLogin ? <Login /> : null}
          {this.state.showLogout ? <Logout /> : null}
        </ul>
      </div>
    </div>
  </nav>
  </header>
    );
  }
});

export default Navbar;
