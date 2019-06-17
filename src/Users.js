import React, { Component } from 'react';

export default class Users extends Component {

  render() {
    console.log("user", this.props.user);
    return (
      <div className="nav_profile">
        <img src="../public/noogle-icon.png" alt="noogle logo"></img>
        <h1>Noogle</h1>
        <p>Hi {this.props.user}!</p>
      </div>
    )
  }
}
