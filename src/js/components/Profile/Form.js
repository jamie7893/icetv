import React from 'react';
import  _ from 'lodash';
import Input from './Input.js';

var Form = React.createClass({
  getInitialState: function () {
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
          console.log(info);
        }
      });
      console.log('yep');
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
          Login to check-in and chat with others.
        </p>


        <form
          className="create_account_form"
          name="regForm"
          onSubmit={this.saveAndContinue}>


          <div class="form-group" >

            <Input
              text="Gravatar Email Address for profile image (optional)"
              ref="gravEmail"
              type="text"
              value={this.state.gravEmail}
              onChange={this.handleGravInput}
              />


              <Input
                text="First Name"
                type="text"
                ref="nameFirst"
                validate={this.isEmpty}
                value={this.state.nameFirst}
                onChange={this.handleNameFirstInput}
                emptyMessage="First name can't be empty"
                />

                <Input
                  text="Last Name"
                  type="text"
                  ref="nameLast"
                  validate={this.isEmpty}
                  value={this.state.nameLast}
                  onChange={this.handleNameLastInput}
                  emptyMessage="Last name can't be empty"
                  />


            <Input
              text="Description"
              ref="desc"
              type="text"
              validate={this.isEmpty}
              value={this.state.desc}
              onChange={this.handleDescInput}
              emptyMessage="Description can't be empty"
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



<div class="form-profile" ng-controller="EditProfileController">
    <h2 align="center">Edit Profile</h2>
    <form class="form-signin" name="regForm" enctype="multipart/form-data">
        <label>Gravatar Email: (optional)</label>
        <br />
        <br />
        <label>Upload Profile Picture With Gravatar</label>
        <br />
        <input type="email" name="gravEmail" class="form-control" ng-model="user.gravEmail"></input>
        <br />
        <br />
        <label>Upload your product picture here:</label>
        <br />
        <br /> Single Image with validations
        <br />
        <br />
        <button class="default-btn" ngf-select ng-model="file" name="file" ngf-pattern="'image/*'" ngf-accept="'image/*'" ngf-max-size="20MB" ngf-min-height="100" ngf-resize="{width: 100, height: 100}">Choose Image</button>
        <br />
        <br />
        <label>First Name</label>
        <input type="text" name="nameFirst" class="form-control" ng-model="user.nameFirst">
        <br />
        <label>Last Name</label>
        <input type="text" name="nameLast" class="form-control" ng-model="user.nameLast">
        <br />
        <label>Description</label>
        <textarea name="desc" class="form-control" ng-model="user.desc"></textarea>
        <br />
        <button type="button" ng-disabled="!user.nameFirst || !user.nameLast || !user.desc" ng-click="submit()" class="btn btn-lg btn-custom btn-block">Update Profile</button>
    </form>
</div>
