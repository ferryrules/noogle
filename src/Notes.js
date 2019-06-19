import React, { Component } from 'react';

export default class Notes extends Component {
  render() {
    return (
      <div>
        <button
          className="deleteNoteBtn"
          id={this.props.id}
          onClick={this.props.deleteMe}>x</button>
        <button
          className="shareButton"
          onClick={(e)=>this.props.edit(this.props.note)}>Edit</button>
        <cite>{this.props.user.username}: </cite>
        {this.props.note.note}
        <ul>
          <a href={this.props.note.url}>{this.props.note.url}</a>
        </ul>
      </div>
    )
  }
}
