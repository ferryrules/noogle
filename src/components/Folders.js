import React, { Component, Fragment } from 'react';
import { Menu, List } from 'semantic-ui-react'

export default class Folders extends Component {

  state = {
    newFolderName: ""
  }

  handleFolderClick = (e) => {
    // debugger
    this.props.changeFolder(e.target.innerText)
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
      return (
        <Fragment>
          <List.Item
            name={f.name}
            active={this.props.thisFolder === `${f.name}`}
            key={f.id + '-' + f.name}
            onClick={this.handleFolderClick}
            id={f.id}>{f.name}</List.Item>
          <br />
        </Fragment>)
    }) : null

    return (
      <div>
        <input type="text" placeholder="New Folder Name" value={this.state.newFolderName} onChange={this.newFolderName}/>
        <button
          onClick={(e)=>this.addFolder(e,this.state.newFolderName)}>+</button>
        <List link>
          <Menu.Header as="h1">Folders</Menu.Header>
         {eachFolder}
       </List>
      </div>
    )
  }
}
