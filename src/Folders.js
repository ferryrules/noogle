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
      return <li key={f.id}>
        <div className="folders-li">
          <button
            name={f.name}
            onClick={this.handleFolderClick}
            id={f.id}>
            <span aria-label="folder" role="img">📁</span> {f.name}
          </button>
          <button
            id={f.id}
            onClick={this.props.deleteFolder}><span aria-label="delete" role="img">✘</span>
          </button>
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
