import React, { Component } from 'react';
import Notes from './Notes'
const NOTE_API = "http://localhost:3000/notes"

export default class NotesContainer extends Component {

  state = {
    notes: [],
    newNote: "",
    shareWithUser: ""
  }

  componentDidMount() {
    fetch(NOTE_API)
    .then(r => r.json())
    .then(notes => {
      this.setState({
        notes
      })
    })
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

  shareWithUser = (e) => {
    this.setState({
      shareWithUser: e.target.value
    })
  }

  shareFolder = (e) => {
    this.props.shareFolder(e,this.state.shareWithUser)
    this.setState({
      shareWithUser: ""
    })
  }

  render() {
    const { folder, users } = this.props

    const folderNotes = this.state.notes.filter(n=>{
      return n.folder_id === this.props.folder.id
    })

    const eachNote = folderNotes.map(n=>{
      let iWroteThis = users.find(u=>{
        return parseInt(u.id) === n.user_id
      })
      return <Notes user={iWroteThis} note={n.note} url={n.url} id={n.id} key={n.id} deleteMe={this.deleteMe} />
    })

    return (
      <div className="notes_container">
        <h2 className="notes_container_header">
          <span className="headerName">
            {folder.name}
          </span>

          { !!folder
            ? (<span className="addCollaboratorContainer">
                <input
                  onChange={this.shareWithUser}
                  placeholder="Enter username"
                  value={this.state.shareWithUser} />
              </span>)
            : null }
          { !!folder
            ? <button onClick={this.shareFolder}>Share</button>
            : null }
        </h2>

        <ul className="notes_container_list">
          {eachNote}
        </ul>

        <form className="notes_container_compose">
          { !!folder ? <input type="text" name="new_note_text" placeholder={`Note`} value={this.state.newNote} onChange={this.newNote}/> : null }
          { !!folder ? <input type="submit" onClick={this.saveNewNote}/> : null }
        </form>
      </div>
    )
  }
}
