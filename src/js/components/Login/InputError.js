import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

var cx = classNames;

var InputError = React.createClass({

  getInitialState: function(){
    return {
      message: 'Input is invalid'
    };
  },

  render: function(){
    var errorClass = cx({
      'error_container':   true,
      'visible':           this.props.visible,
      'invisible':         !this.props.visible
    });

    return (
      <div className={errorClass}>
        <span>{this.props.errorMessage}</span>
      </div>
    )
  }

})

export default InputError;
