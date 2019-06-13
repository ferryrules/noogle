import React, { Component } from 'react';
import Notes from './Notes'
const NOTE_API = "http://localhost:3000/notes"

export default class NotesContainer extends Component {

  state = {
    folder: 1 || this.props.folder,
    notes: [],
    newNote: ""
  }

  componentDidMount() {
    fetch(NOTE_API)
    .then(r => r.json())
    .then(notes => this.setState({ notes }))
  }

  newNote = (e) => {
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
        folder_id: this.state.folder,
        key: this.state.newNote
      })
    })
    .then(r=>r.json())
    .then(note=>{
      this.setState({
        notes: [...this.state.notes, note],
        newNote: ""
      })
    })
  }



  deleteMe = (e) => {
    console.log(e.target.id);
    let findNote = this.state.notes.filter(n=>{
      return n.id !== parseInt(e.target.id)
    })
    console.log(findNote);
    fetch(`http://localhost:3000/notes/${e.target.id}`, {method: "DELETE"})
    this.setState({
      notes: findNote
    })
  }

  render() {
    const eachNote = this.state.notes.map(n=>{
      if (n.folder_id === this.state.folder) {
        return <Notes note={n.note} id={n.id} key={n.id} deleteMe={this.deleteMe} />
      }
    })

    return (
      <div className="notes_container">
        <h2 className="notes_container_header">Sup Bro</h2>
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
