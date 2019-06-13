import React, { Component } from 'react';
import Folders from './Folders'
import Users from './Users'

export default class NavContainer extends Component {

  render() {
    return (
      <div className="nav_container">
        <Users />
        <Folders changeFolder={this.props.changeFolder} folders={this.props.folders}/>
      </div>
    )
  }
}
