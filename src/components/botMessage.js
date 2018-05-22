import React, { Component } from 'react';
class BotMessage extends Component{

    render(){
        return(
            <div className = "messageContainer__botMessage">
                {this.props.message}
            </div>
        );
    }
}

export default BotMessage;