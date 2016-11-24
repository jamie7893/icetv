import React from 'react';
import  _ from 'lodash';
import Input from './Input.js';
import {hashHistory} from 'react-router';

var Form = React.createClass({
  getInitialState: function () {
    return {
      email: "",
      password: ""
    }
  },

  handlePasswordInput: function (event) {
    this.setState({
      password: event.target.value
    });
  },

  saveAndContinue: function (e) {
    e.preventDefault();
    console.log(this.refs.password.isValid());
    var canProceed = this.validateEmail(this.state.email)
    && this.refs.password.isValid()

    if(canProceed) {
      var checkUser = {
        email: this.state.email,
        password: this.state.password
      };
      this.setState({
        email: "",
        password: ""
      });

      $.ajax({
        type: "POST",
        url: '/login',
        data: checkUser,
        success: function(info) {
          console.log(info);
          hashHistory.push({
            pathname: '/profile',
            state: {user: info}
          });

        }
      });
    } else {
      this.refs.email.isValid();
      this.refs.password.isValid();
    }
  },

  handleEmailInput: function(event){
    this.setState({
      email: event.target.value
    });
  },

  validateEmail: function (event) {
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(event);
  },

  isEmpty: function (value) {
    return !_.isEmpty(value);
  },


  render: function() {
    return (
      <div className="create_account_screen">


        <br />


        <h2 class="formTitle" align="center">Prattle</h2>


        <p class="formTitle">
          Login to check-in and chat with others.
        </p>


        <form
          className="create_account_form"
          name="regForm"
          onSubmit={this.saveAndContinue}>


          <div class="form-group" >


            <Input
              text="Email Address"
              ref="email"
              type="text"
              validate={this.validateEmail}
              value={this.state.email}
              onChange={this.handleEmailInput}
              errorMessage="Email is invalid"
              emptyMessage="Email can't be empty"
              errorVisible={this.state.showEmailError}
              />


          </div>


          <div class="form-group" >


            <Input
              text="Password"
              type="password"
              ref="password"
              validator={this.IsEmpty}
              value={this.state.passsword}
              emptyMessage="Password is invalid"
              onChange={this.handlePasswordInput}
              />

            Don't have a account? <a href="#/"> Register</a>

      </div>


      <button
        type="submit"
        class="btn btn-custom btn-block">Login</button>


      <br />


    </form>


  </div>
)
}
});
export default Form;
