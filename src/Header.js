import React from 'react';

export default class Header extends React.Component  {
  render () {
    return(
      <div className="headerContainer">
        <div>
          <h1>Noogle</h1>
          <p> - never get caught oogling for notes again! </p>
        </div>
        <img height="75px" width="75px" src="/noogle-icon.png" alt="noogle icon" />
      </div>
    )
  }
}
