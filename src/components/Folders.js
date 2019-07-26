import React, { Component } from 'react';

export default class Folders extends Component {

  state = {
    newFolderName: ""
  }

  handleFolderClick = (e) => {
    this.props.changeFolder(e.target.name)
  }

  addFolder = (e, folderName) => {
    this.props.addFolder(e, folderName)
    this.setState({ newFolderName: "" })
  }

  newFolderName = (e) => {
    this.setState({
      newFolderName: e.target.value
    })
  }

  render() {
    const { folders } = this.props
    // console.log(this.props.folders);
    const eachFolder = folders ? folders.map(f => {
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
    }) : null

    return (
      <div>
        <div className="foldersContainer">
          <div className="addFolderWrapper">
            <input type="text" placeholder="New folder name" value={this.state.newFolderName} onChange={this.newFolderName}/>
            <button
              className="addFolderBtn"
              onClick={(e)=>this.addFolder(e,this.state.newFolderName)}>+</button>
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
