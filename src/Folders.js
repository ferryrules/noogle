import React, { Component } from 'react';

export default class Folders extends Component {

  handleFolderClick = (e) => {
    this.props.changeFolder(e.target.name)
  }

  render() {
    const userFolders = this.props.folders.filter(uf=>{
      return uf.user_id === this.props.currentUser
    })

    const eachFolder = userFolders.map(f => {
      return <li  key={f.id}>
        <div className="folders-li">
        <div>
          <a href="" name={f.name} onClick={this.handleFolderClick} id={f.id}>📁 {f.name}</a>
        </div><a href="" id={f.id} onClick={this.props.deleteFolder}>✘</a>
        </div>
      </li>
    })

    return (
        <div className="foldersContainer">
          <input type="text" placeholder="New folder name" onChange={this.props.newFolderName}/>
          <button onClick={this.props.addFolder}>+</button>
        <div className="nav_folders_list">
          <h2>Folders</h2>
          <ul className="foldersListStyle">
          {eachFolder}
          </ul>
        </div>
      </div>

    )
  }
}
