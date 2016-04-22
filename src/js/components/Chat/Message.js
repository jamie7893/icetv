import React from 'react';


var Message = React.createClass({

    render: function() {
        return (
          <li class="media" >


            <div class="media-body">


              <div class="media">

                <a class="pull-left" href="#">

                  <img class="media-object img-circle" />

                </a>

                <div class="media-body">

                  <p class="chatText">
                    {this.props.message.message}
                  </p>

                  <br />

                  <small class="text-muted">
                    Posted by <b></b>, at
                  </small>

                  <hr />

                </div>

              </div>


            </div>

          </li>

        )
    }
});

export default Message;
