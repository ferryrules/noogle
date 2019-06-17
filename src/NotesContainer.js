import React, { Component } from 'react';
import Notes from './Notes'
const NOTE_API = "http://localhost:3000/notes"

export default class NotesContainer extends Component {

  state = {
    notes: [],
    newNote: ""
  }

  componentDidMount() {
    fetch(NOTE_API)
    .then(r => r.json())
    .then(notes => {
      // console.log("notes", notes)
      this.setState({
        notes
      })
    })
  }

  newNote = (e) => {
    // console.log(e.target.value);
    this.setState({
      newNote: e.target.value
    })
  }

  saveNewNote = (e) => {
    e.preventDefault()
    fetch(NOTE_API, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        note: this.state.newNote,
        folder_id: this.props.folder.id,
        user_id: this.props.user,
        key: this.state.newNote
      })
    })
    .then(r=>r.json())
    .then(note=>{
      console.log("new note", note);
      this.setState({
        notes: [...this.state.notes, note],
        newNote: ""
      })
    })
  }

  deleteMe = (e) => {
    let findNote = this.state.notes.filter(n=>{
      return n.id !== parseInt(e.target.id)
    })
    fetch(`http://localhost:3000/notes/${e.target.id}`, {method: "DELETE"})
    this.setState({
      notes: findNote
    })
  }

  render() {
    const { folder, shareWithUser, shareFolder, users } = this.props

    const folderNotes = this.state.notes.filter(n=>{
      return n.folder_id === this.props.folder.id
    })
    const eachNote = folderNotes.map(n=>{
      let iWroteThis = users.find(u=>{
        return parseInt(u.id) === n.user_id
      })
      return <Notes user={iWroteThis} note={n.note} id={n.id} key={n.id} deleteMe={this.deleteMe} />
    })

    return (
      <div className="notes_container">
        <h2
          className="notes_container_header">{folder.name}
          <input onChange={shareWithUser} placeholder="Enter username" />
          <button onClick={shareFolder}>Share</button>
        </h2>
        <ul className="notes_container_list">
          {eachNote}
        </ul>
        <form className="notes_container_compose">
          <input type="text" name="new_note_text" placeholder={`Note`} value={this.state.newNote} onChange={this.newNote}/>
          <input type="submit" onClick={this.saveNewNote}/>
        </form>
      </div>
    )
  }
}
