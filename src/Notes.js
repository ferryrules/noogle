import React, { Component } from 'react';

export default class Notes extends Component {

  render() {
    return (
      <div className="note">
        <div>
          <li>{this.props.user.username}: {this.props.note}
            <button id={this.props.id} onClick={this.props.deleteMe}>x</button>
            <ul>
            <a href={this.props.url}>{this.props.url}</a>
            </ul>
          </li>
        </div>
      </div>
    )
  }
}
