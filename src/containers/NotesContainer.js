import React, { Component } from 'react';
import Notes from '../components/Notes'

export default class NotesContainer extends Component {

  state = {
    note: "",
    url: "",
    shareWithUser: "",
    editFolderName: "",
    editingFolder: false,
    currentNote: [],
    editNoteText: "",
    editNoteURL: "",
    editingNote: false,
  }

  saveNewNote = (e) => {
    const { note, url } = this.state
    this.props.addNote(e, note, url)
    this.setState({
      note: "",
      url: ""
    })
  }

  newNote = (e) => {
    // console.log(e.target);
    const {name,value} = e.target
    this.setState({
      [name]: value
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
    const { editingNote, currentNote, editNoteText, editNoteURL } = this.state
    let switcher = editingNote
    switcher = !switcher
    this.setState({
      editingNote: switcher
    })
    this.props.editNote(currentNote.id, editNoteText, editNoteURL)
  }

  allNotes = () => {
    const { notes } = this.props
    console.log(notes);
    if (notes) {
      return notes.map(n=>{
        return (
          <Notes
            note={n}
            id={n.id}
            key={n.id}
            deleteNote={this.props.deleteNote}
            edit={this.editingNote} />
        )
      })
    }
  }

  render() {
    // console.log("props", this.props);
    // console.log("state", this.state);
    const { folder } = this.props
    const { note, url, shareWithUser, editingFolder, editingNote } = this.state

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
              : this.allNotes() }
          </ul>
        </div>
        <div className="notesFooter staticBottom">
          <form>
            { !!folder ? <input className="noteText" type="text" name="note" placeholder={`Note`} value={note} onChange={this.newNote}/> : null }
            { !!folder ? <input className="noteURL"  type="text" name="url" placeholder={`URL`} value={url} onChange={this.newNote}/> : null }
            { !!folder ? <input type="submit" onClick={this.saveNewNote}/> : null }
          </form>
        </div>
      </div>
    )
  }
}
