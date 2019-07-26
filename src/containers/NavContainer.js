import React, { Component } from 'react';
import Folders from '../components/Folders'

export default class NavContainer extends Component {

  render() {
    // console.log("navContainer", this.props);
    const { addFolder, changeFolder, deleteFolder, folders, addUser, user } = this.props
    return (
      <div className="navContainer">
        <br />
        <Folders
          addFolder={addFolder}
          changeFolder={changeFolder}
          deleteFolder={deleteFolder}
          folders={folders}
          user={user}
          addUser={addUser} />
      </div>
    )
  }
}
