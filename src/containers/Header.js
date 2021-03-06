import React from 'react';

export default class Header extends React.Component  {
  render () {
    return(
      <div>
        <div>
          <img height="60px" width="60px" src="/noogle-icon.png" alt="noogle icon" />
          <h2>Noogle</h2>
          <h3>v1.0.0</h3>
        </div>
        <span> - never get caught oogling for notes again! </span>
        <div>
          <span> </span>
          <span>Welcome, </span>
          <span> </span>
          <span>{this.props.user.username}!</span>
        </div>
      </div>
    )
  }
}


// <img width="50px" height="50px" src="/profile-placeholder.png" alt="user-pic"/>
