import React, { Component } from 'react';
class Header extends Component{
    render(){
        return(
            <div className = "page-header">
                <div className = "page-header__title">{this.props.title}</div>
            </div>
        );
    }
}

export default Header;