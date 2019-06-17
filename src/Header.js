import React from 'react';

export default class LoginPage extends React.Component  {
  render () {
    return(
      <div>
        <img src="/noogle-icon.png" alt="noogle icon" />
        <h1>Noogle</h1>
        <button onClick={this.props.logout}>Sign Out</button>
      </div>
    )
  }
}
