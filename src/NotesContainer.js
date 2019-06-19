import React, { Component } from 'react';
import Notes from './Notes'
const NOTE_API = "http://localhost:3000/notes"

export default class NotesContainer extends Component {

  state = {
    notes: [],
    newNote: "",
    newURL: "",
    shareWithUser: "",
    editFolderName: "",
    editingFolder: false,
    currentNote: [],
    editNoteText: "",
    editNoteURL: "",
    editingNote: false,
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

  newURL = (e) => {
    this.setState({
      newURL: e.target.value
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
        url: this.state.newURL,
        key: this.state.newNote
      })
    })
    .then(r=>r.json())
    .then(note=>{
      console.log("new note", note);
      this.setState({
        notes: [...this.state.notes, note],
        newNote: "",
        newURL: ""
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

  editingFolder = (e) => {
    let switcher = this.state.editingFolder
    switcher = !switcher
    this.setState({
      editingFolder: switcher,
      editFolderName: this.props.folder.name
    })
  }

  editFolderName = (e) => {
    this.setState({
      editFolderName: e.target.value
    })
  }

  saveFolderChange = (e) => {
    let switcher = this.state.editingFolder
    switcher = !switcher
    this.setState({
      editingFolder: switcher
    })
    this.props.editFolder(this.state.editFolderName)
  }

  editingNote = (note) => {
    let switcher = this.state.editingNote
    switcher = !switcher
    this.setState({
      currentNote: note,
      editingNote: switcher,
      editNoteText: note.note,
      editNoteURL: note.url
    })
  }

  editNoteShit = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  saveNoteChange = (e) => {
    let switcher = this.state.editingNote
    switcher = !switcher
    this.setState({
      editingNote: switcher
    })
    fetch(NOTE_API + `/${this.state.currentNote.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        note: this.state.editNoteText,
        url: this.state.editNoteURL
      })
    })
    .then(r=>r.json())
    .then(note=>{
      this.componentDidMount()
    })
  }

  render() {
    const { folder, users } = this.props
    const { newNote, newURL, shareWithUser, editingFolder, editingNote } = this.state

    const folderNotes = this.state.notes.filter(n=>{
      return n.folder_id === this.props.folder.id
    })

    const eachNote = folderNotes.map(n=>{
      let iWroteThis = users.find(u=>{
        return parseInt(u.id) === n.user_id
      })
      return <Notes
            user={iWroteThis}
            note={n}
            id={n.id}
            key={n.id}
            deleteMe={this.deleteMe}
            edit={this.editingNote} />
    })

    return (
      <div className="notesContainer">
        <div className="notesHeader">

          { !!editingFolder
            ? (<div>
                <input
                  className="shareInput"
                  onChange={this.editFolderName}
                  value={this.state.editFolderName} />
                <button
                  className="shareButton"
                  onClick={this.saveFolderChange}>Save
                </button>
              </div>)
            : (<label
                className="notesFolderName">{folder.name}
                <button
                  className="shareButton"
                  onClick={this.editingFolder}>Edit
                </button>
              </label>) }

          { (!!folder && !editingFolder)
            ? (<input
                className="shareInput"
                onChange={this.shareWithUser}
                placeholder="Enter username"
                value={shareWithUser} />)
            : null }

          { (!!folder && !editingFolder)
            ? <button className="shareButton" onClick={this.shareFolder}><span>Share</span></button>
            : null }

        </div>
        <div className="notesContent">
          <ul>
            { !!editingNote
              ? (<div>
                  <input
                    className="shareInput"
                    name="editNoteText"
                    onChange={this.editNoteShit}
                    value={this.state.editNoteText} />
                  <input
                    className="shareInput"
                    name="editNoteURL"
                    onChange={this.editNoteShit}
                    value={this.state.editNoteURL} />
                  <button onClick={this.saveNoteChange}>Save</button>
                </div>)
              : eachNote }
          </ul>
        </div>
        <div className="notesFooter staticBottom">
          <form>
            { !!folder ? <input className="noteText" type="text" name="new_note_text" placeholder={`Note`} value={newNote} onChange={this.newNote}/> : null }
            { !!folder ? <input className="noteURL"  type="text" name="new_note_url" placeholder={`URL`} value={newURL} onChange={this.newURL}/> : null }
            { !!folder ? <input type="submit" onClick={this.saveNewNote}/> : null }
          </form>
        </div>
      </div>
    )
  }
}
