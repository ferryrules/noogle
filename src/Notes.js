import React, { Component } from 'react';

export default class Notes extends Component {
  render() {
    // console.log(this.props);
    return (
      <div>
        <button
          className="deleteNoteBtn"
          id={this.props.id}
          onClick={this.props.deleteMe}>x</button>
        <button
          className="editNoteBtn"
          onClick={(e)=>this.props.edit(this.props.note)}>Edit</button>
        <cite>{this.props.note.username}: </cite>
        {this.props.note.note}
        <ul>
          <a href={this.props.note.url}>{this.props.note.url}</a>
        </ul>
      </div>
    )
  }
}
