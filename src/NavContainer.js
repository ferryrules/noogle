import React, { Component } from 'react';
import Folders from './Folders'
import Users from './Users'

export default class NavContainer extends Component {

  render() {
    const { newFolderName, addFolder, changeFolder, deleteFolder, folders, addUser, user } = this.props
    // console.log("navcont", folders);
    return (
      <div className="nav_container">
        <Users />
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
