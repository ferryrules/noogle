import React, { Component, Fragment } from 'react';
import Folders from '../components/Folders'
// import { Menu } from 'semantic-ui-react'

export default class NavContainer extends Component {

  render() {
    // console.log("navContainer", this.props);
    const { addFolder, thisFolder, changeFolder, deleteFolder, folders, addUser, user } = this.props
    return (
      <Fragment>
        <br />
        <Folders
          thisFolder={thisFolder}
          addFolder={addFolder}
          changeFolder={changeFolder}
          deleteFolder={deleteFolder}
          folders={folders}
          user={user}
          addUser={addUser} />
      </Fragment>
    )
  }
}
