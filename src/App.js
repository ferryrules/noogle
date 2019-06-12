import React from 'react';
import './App.css';
import NotesContainer from './NotesContainer.js'
import NavContainer from './NavContainer.js'
const FOLDER_API = "http://localhost:3000/folders"

class App extends React.Component {
  state = {
    folders: []
  }

  componentDidMount() {
    fetch(FOLDER_API)
    .then(r => r.json())
    .then(folders => this.setState({ folders }))
  }

  render() {
    const { folders } = this.state
    return (
      <div className="grid-container">
        <NavContainer folders={folders}/>
        <NotesContainer folder={folders}/>
      </div>
    );
  }
}

export default App;
