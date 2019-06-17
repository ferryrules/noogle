import React, { Component } from 'react';

export default class Users extends Component {

  render() {
    console.log("user", this.props.user);
    return (
      <div className="nav_profile">
        <div className="welcomeParagraphWrapper">

          <span>Welcome, </span>
          <span className="navUsername"> {this.props.user}!</span>
        </div>
        <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png" />
      </div>
    )
  }
}
