import React from 'react';


var Message = React.createClass({




    render: function() {

        return (

          <div class="media" >


            <div class="media-body">


              <div class="media">

                <a class="pull-left" href="#">

                  <img class="media-object img-circle msgImage" src={this.props.message.img}/>

                </a>

                <div class="media-body">

                  <p class="chatText">
                    {this.props.message.message}
                  </p>

                  <br />

                  <small class="text-muted">
                    Posted by <b class="online">{this.props.message.username}</b>, at {this.props.message.createdAt}
                  </small>

                  <br />

                </div>

              </div>


            </div>

          </div>

        )
    }
});

export default Message;
