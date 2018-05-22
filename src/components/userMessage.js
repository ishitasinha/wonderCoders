import React, { Component } from 'react';
class UserMessage extends Component{

    render(){
        return(
            <div className = "messageContainer__userMessage">
                {this.props.message}
            </div>
        );
    }
}

export default UserMessage;