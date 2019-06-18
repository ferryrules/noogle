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
      return <li  className="folders-li" key={f.id}>
        <button
          className="openFolderBtn"
          name={f.name}
          onClick={this.handleFolderClick}
          id={f.id}>
          <span aria-label="folder" role="img">📁</span> {f.name}
        </button>
        <button
          className="delFolderBtn"
          id={f.id}
          onClick={this.props.deleteFolder}><span aria-label="delete" role="img">✘</span>
        </button>
      </li>
    })

    return (
      <div>
        <div className="foldersContainer">
          <div className="addFolderWrapper">
            <input type="text" placeholder="New folder name" onChange={this.props.newFolderName}/>
            <button
              className="addFolderBtn"
              onClick={this.props.addFolder}>+</button>
          </div>
        </div>
        <div className="foldersHeadingWrapper">
          <h2 className="foldersHeading">Folders</h2>
        </div>
        <div className="nav_folders_list">
          <ul className="foldersListStyle">
          {eachFolder}
          </ul>
        </div>
        </div>
    )
  }
}
