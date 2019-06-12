import React, { Component } from 'react';

export default class Folders extends Component {

  render() {
    const eachFolder = this.props.folders.map(f => {
      return <li key={f.id}><button id={f.id}>{f.name}</button></li>
    })
    return (
      <div className="nav_folders_list">
        <h2>Folders</h2>
        <input type="text" placeholder="New folder name" />
        <button>+</button>
        <ul>
          {eachFolder}
        </ul>
      </div>
    )
  }
}
