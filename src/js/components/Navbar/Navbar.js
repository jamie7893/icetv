import React from "react";

var Navbar = React.createClass({
  getInitialState: function () {
    return {
      email: "",
      password: ""
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
  render: function() {
    return (
  <nav class="navbar navbar-default navbar-inverse" role="navigation">
    <div class="container-fluid">

      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav navbar-right">
          <li><p class="navbar-text">Already have an account?</p></li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown"><b>Login</b> <span class="caret"></span></a>
  			<ul id="login-dp" class="dropdown-menu">
  				<li>
  					 <div class="row">
  							<div class="col-md-12">
  								 <form class="form" role="form" method="post" action="login" accept-charset="UTF-8" id="login-nav">
  										<div class="form-group">
  											 <label class="sr-only" for="exampleInputEmail2">Email address</label>
  											 <input type="email" onChange={this._handleEmailInput} class="form-control" id="exampleInputEmail2" placeholder="Email address" required></input>
  										</div>
  										<div class="form-group">
  											 <label class="sr-only" for="exampleInputPassword2">Password</label>
  											 <input type="password" onChange={this._handlePasswordInput} class="form-control" id="exampleInputPassword2" placeholder="Password" required></input>

  										</div>
  										<div class="form-group">
  											 <button type="submit" onClick={this._handleLogin} class="btn btn-primary btn-block">Sign in</button>
  										</div>
  								 </form>
  							</div>
  							<div class="bottom text-center">
  								New here ? <a href="/#/register"><b>Join Us</b></a>
  							</div>
  					 </div>
  				</li>
  			</ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    );
  }
});

export default Navbar;
