import React from 'react';
import './App.css';
import NotesContainer from './NotesContainer.js'
import NavContainer from './NavContainer.js'
const FOLDER_API = "http://localhost:3000/folders"

class App extends React.Component {
  state = {
    thisFolder: 1,
    folders: []
  }

  componentDidMount() {
    fetch(FOLDER_API)
    .then(r => r.json())
    .then(folders => this.setState({ folders }))
  }

  changeFolder = (e) => {
    console.log(e.target.id);
  }

  render() {
    const { folders, thisFolder } = this.state
    return (
      <div className="grid-container">
        <NavContainer changeFolder={this.changeFolder} folders={folders}/>
        <NotesContainer folder={thisFolder}/>
      </div>
    );
  }
}

export default App;
