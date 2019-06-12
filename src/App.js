import React from 'react';
import './App.css';
import Folders from './Folders.js'
import Users from './Users.js'
import Notes from './Notes.js'
import NotesContainer from './NotesContainer.js'
import NavContainer from './NavContainer.js'
const FOLDER_API = "http://localhost:3000/folders"

class App extends React.Component {
  state = {
    user: [],
    folders: [],
    notes: []
  }

  componentDidMount() {
    fetch(FOLDER_API)
    .then(r => r.json())
    .then(folders => {
      this.setState({
        folders
      })
    })
  }

  render() {
    const { folders } = this.state
    console.log(this.state.folders);
    return (
      <div className="App">
        <NavContainer />
        <Folders folders={folders}/>
        <Users />
        <NotesContainer />
        <Notes />
      </div>
    );
  }
}

export default App;
