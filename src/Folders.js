import React, { Component } from 'react';
const FOLDER_API = "http://localhost:3000/folders"

export default class Folders extends Component {
  state = {
    folders: []
  }

  componentDidMount() {
    fetch(FOLDER_API)
    .then(r => r.json())
    .then(folders => {
      console.log(folders);
    })
  }

  render() {
    console.log(this.state.folders);
    return (
      <div>
        <h1>Hi!</h1>
        <p>{this.state.folders}</p>
      </div>
    )
  }
}
