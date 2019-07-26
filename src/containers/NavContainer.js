import React, { Component } from 'react';
import Folders from '../components/Folders'

export default class NavContainer extends Component {

  render() {
    const { newFolderName, addFolder, changeFolder, deleteFolder, folders, addUser, user } = this.props
    return (
      <div className="navContainer">
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
