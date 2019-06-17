import React, { Component } from 'react';

export default class Users extends Component {

  render() {
    return (
      <div className="nav_profile">
        <div className="welcomeParagraphWrapper">
          <button onClick={this.props.logout}>Logout</button>
          <img width="50px" height="50px" src="/profile-placeholder.png" alt="user-pic"/>
          <span>Welcome, </span>
          <span className="navUsername">{this.props.user}!</span>
        </div>
      </div>
    )
  }
}
