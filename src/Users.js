import React, { Component } from 'react';

export default class Users extends Component {

  render() {
    console.log("user", this.props.user);
    return (
      <div className="nav_profile">
        <p>Hi {this.props.user}!</p>
      </div>
    )
  }
}
