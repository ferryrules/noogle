import React, { Component } from 'react';

export default class Notes extends Component {
  render() {
    const { id, deleteNote, note } = this.props
    return (
      <div>
        <button
          id={id}
          onClick={deleteNote}>x</button>
        <button
          onClick={(e)=>this.props.edit(note)}>Edit</button>
        <cite>{note.username}: </cite>
        {note.note}
        <ul>
          <a href={note.url}>{note.url}</a>
        </ul>
      </div>
    )
  }
}
