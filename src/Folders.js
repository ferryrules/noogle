import React, { Component } from 'react';

export default class Folders extends Component {

  eachFolder = () => {
    return this.props.folders.map(f=>f.name)
  }

  render() {
    return (
      <div>
        <h1>Hi Folders!</h1>
        <ul>
          <li>{this.eachFolder()}</li>
        </ul>
      </div>
    )
  }
}
