import React, { Component } from 'react';
import Folders from './Folders'
import Users from './Users'

export default class NavContainer extends Component {

  render() {
    const { newFolderName, addFolder, changeFolder, deleteFolder, folders, addUser, user, username, logout } = this.props
    return (
      <div className="navContainer">
        <Users
          user={username}/>
        <Folders
          addFolder={addFolder}
          newFolderName={newFolderName}
          changeFolder={changeFolder}
          deleteFolder={deleteFolder}
          folders={folders}
          user={user}
          addUser={addUser} />
      </div>
    )
  }
}
