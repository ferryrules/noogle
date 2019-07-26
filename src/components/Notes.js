import React, { Component } from 'react';

export default class Notes extends Component {
  render() {
    // console.log("notes props", this.props.note);
    const { id, deleteMe, note } = this.props
    return (
      <div>
        <button
          className="deleteNoteBtn"
          id={id}
          onClick={deleteMe}>x</button>
        <button
          className="editNoteBtn"
          onClick={(e)=>this.props.edit(note)}>Edit</button>
        <cite>{note.username ? note.username : note.user.username}: </cite>
        {note.note}
        <ul>
          <a href={note.url}>{note.url}</a>
        </ul>
      </div>
    )
  }
}
