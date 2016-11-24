import React from 'react';


var User = React.createClass({

    render: function() {
        return (
          <li class="media user">


            <div class="media-body">


              <div class="media">

                <a class="pull-left" href="#">

                  <img class="media-object img-circle msgImage" src={this.props.user.img} />

                </a>

                <div class="media-body">

                  <h5 class="onlineUser">  {this.props.user.username} | User </h5>


                  <small class="text-muted online">
                    <b>Online</b>
                  </small>

                </div>

              </div>


            </div>

          </li>


        )
    }
});

export default User;
