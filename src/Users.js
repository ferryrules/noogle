import React, { Component } from 'react';

export default class Users extends Component {

  render() {
    return (
      <div className="nav_profile">
        <img width="50px" height="50px" src="/profile-placeholder.png" alt="user-pic"/>
        <p>Hi {this.props.user}!</p>
      </div>
    )
  }
}
