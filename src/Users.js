import React, { Component } from 'react';

export default class Users extends Component {

  render() {
    return (
      <div className="nav_profile">
        <div className="imgWrapper">
          <img width="50px" height="50px" src="/profile-placeholder.png" alt="user-pic"/>          
        </div>
        <div className="welcomeParagraphWrapper">
          <span>Welcome, </span>
          <span className="navUsername">{this.props.user}!</span>
        </div>

      </div>
    )
  }
}
