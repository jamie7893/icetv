import React from 'react';
import  _ from 'lodash';
import Input from './Input.js';
import {hashHistory, Router} from 'react-router';
  console.log(this)
var Form = React.createClass({
  getInitialState: function () {
    console.log(Router, hashHistory)
    return {
      gravEmail: "",
      nameFirst: "",
      nameLast: "",
      desc: ""
    }
  },

  saveAndContinue: function (e) {
    e.preventDefault();
    var canProceed = !_.isEmpty(this.state.nameFirst)
    && !_.isEmpty(this.state.nameLast)

    if(canProceed) {
      if(this.state.gravEmail.length > 3) {
      var checkUser = {
        gravEmail: this.state.gravEmail,
        nameFirst: this.state.nameFirst,
        nameLast: this.state.nameLast,
        desc: this.state.desc
      };
    } else {
      var checkUser = {
        nameFirst:  this.state.nameFirst,
        nameLast:  this.state.nameLast,
        desc:  this.state.desc
      }
    }
      this.setState({
        gravEmail: "",
        nameFirst: "",
        nameLast: "",
        desc: ""
      });

      $.ajax({
        type: "POST",
        url: 'http://localhost:1738/updateprofile',
        data: checkUser,
        success: function(info) {
          console.log(info)
        hashHistory.push('/checkin');
        }
      });
    } else {
      this.refs.nameFirst.isValid();
      this.refs.nameLast.isValid();
    }
  },


  handleGravInput: function(event){
    this.setState({
      gravEmail: event.target.value
    });
  },
  handleNameFirstInput: function(event){
    this.setState({
      nameFirst: event.target.value
    });
  },
  handleNameLastInput: function(event){
    this.setState({
      nameLast: event.target.value
    });
  },
  handleDescInput: function(event){
    this.setState({
      desc: event.target.value
    });
  },

  isEmpty: function (value) {
    return !_.isEmpty(value);
  },


  render: function() {
    return (
      <div className="create_account_screen">


        <br />


        <h2 class="formTitle" align="center"> Thesis Project </h2>


        <p class="formTitle">
          Update your profile
        </p>


        <form
          className="form-signin"
          name="regForm"
          onSubmit={this.saveAndContinue}>


          <div class="form-group" >
            <label>Gravatar Email Address for profile image (optional)</label>
            <Input
              text="Gravatar Email Address"
              ref="gravEmail"
              type="text"
              value={this.state.gravEmail}
              onChange={this.handleGravInput}
              />

            <label>First Name</label>
              <Input
                text="First Name"
                type="text"
                ref="nameFirst"
                validate={this.isEmpty}
                value={this.state.nameFirst}
                onChange={this.handleNameFirstInput}
                emptyMessage="First name can't be empty"
                />

              <label>Last Name</label>
                <Input
                  text="Last Name"
                  type="text"
                  ref="nameLast"
                  validate={this.isEmpty}
                  value={this.state.nameLast}
                  onChange={this.handleNameLastInput}
                  emptyMessage="Last name can't be empty"
                  />

                <label>Description Name</label>
            <Input
              text="Description"
              ref="desc"
              type="text"
              value={this.state.desc}
              onChange={this.handleDescInput}
              />


          </div>


      <button
        type="submit"
        class="btn btn-custom btn-block">Update Profile</button>


      <br />


    </form>


  </div>
)
}
});
export default Form;
