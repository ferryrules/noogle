import React from 'react';

export default class LoginPage extends React.Component  {
  render () {
    return(
      <div>
        <img height="75px" width="75px" src="/noogle-icon.png" alt="noogle icon" />
        <h1>Noogle</h1>
        <button onClick={this.props.logout}>Sign Out</button>
      </div>
    )
  }
}
