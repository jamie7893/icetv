import React from 'react';

var Image = React.createClass({
    render: function() {

        return (
            <img class="homeImg" src={this.props.image}/>
        )
    }
});

export default Image
