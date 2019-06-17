import React from 'react';

export default class Header extends React.Component  {
  render () {
    return(
      <div className="headerContainer">
        <img height="75px" width="75px" src="/noogle-icon.png" alt="noogle icon" />
        <h1>Noogle</h1>
      </div>
    )
  }
}
