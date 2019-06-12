import React, { Component } from 'react';
import Notes from './Notes'
const NOTE_API = "http://localhost:3000/notes"

export default class NotesContainer extends Component {

  state = {
    notes: []
  }

  componentDidMount() {
    fetch(NOTE_API)
    .then(r => r.json())
    .then(notes => this.setState({ notes }))
  }

  render() {
    const eachNote = this.state.notes.map(n=>{
      return <Notes note={n.note} key={n.id} />
    })
    
    return (
      <div className="notes_container">
        <h2 className="notes_container_header">Sup Bro</h2>
        <ul className="notes_container_list">
          {eachNote}
        </ul>
        <form className="notes_container_compose">
          <input type="text" name="new_note_text" placeholder={`Note`} />
          <input type="submit" />
        </form>
      </div>
    )
  }
}
