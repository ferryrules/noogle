import React, { Component } from 'react';

export default class Users extends Component {

  render() {
    return (
      <div className="nav_profile">
        <div className="welcomeParagraphWrapper">
          <img width="50px" height="50px" src="/profile-placeholder.png" alt="user-pic"/>
          <span>Welcome, </span>
          <span className="navUsername">{this.props.user}!</span>
        </div>
        <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png" />
      </div>
    )
  }
}
