import React from 'react';
import './App.css';
import NotesContainer from './NotesContainer.js'
import NavContainer from './NavContainer.js'
import { Switch, Route } from 'react-router-dom'
const USER_API = "http://localhost:3000/users"
const FOLDER_API = "http://localhost:3000/folders"

class App extends React.Component {
  state = {
    users: [],
    folders: [],
    thisFolder: [],
    currentUser: 2,
    newFolder: "",
    addUserInput: ""
  }

  componentDidMount() {
    fetch(USER_API)
    .then(r => r.json())
    .then(users => {
      console.log("fetch", users);
      let user = users.find(u=>u.id===this.state.currentUser)
      this.setState({
        users,
        folders: user.folders,
        thisFolder: user.folders[0]
      })
    })
  }

  newFolderName = (e) => {
    console.log(e.target.value);
    this.setState({
      newFolder: e.target.value
    })
  }

  addFolder = (e) => {
    e.preventDefault()
    fetch(FOLDER_API,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.newFolder,
        user_id: this.state.currentUser
      })
    })
    .then(r=>r.json())
    .then(myFolder=>{
      console.log(myFolder);
      let folder = {
        name: myFolder.name,
        id: myFolder.id,
        notes: []
      }
      // debugger
      this.setState({
        folders: [...this.state.folders, folder],
        newFolderName: ""
      })
    })
  }

  changeFolder = (folderName) => {
    let selectedFolder = this.state.folders.find(f=>{
      return f.name === folderName
    })
    this.setState({
      thisFolder: selectedFolder
    })
  }

  deleteFolder = (e) => {
    console.log(e.target.id);
    let findFolder = this.state.folders.filter(f=>{
      return f.id !== parseInt(e.target.id)
    })
    fetch(FOLDER_API+`/${e.target.id}`, {method: "DELETE"})
    this.setState({
      folders: findFolder
    })
  }

  addUserInput = (e) => {
    // console.log(e.target.value);
    this.setState({
      addUserInput: e.target.value
    })
  }

  addUser = (e) => {
    e.preventDefault()
    console.log(this.state.users);
    console.log(e.target.id);
    console.log(this.state.addUserInput);
    let grabUser = this.state.users.find(u=>{
      return u.username === this.state.addUserInput
    })
    console.log(grabUser);
    fetch(FOLDER_API+`/${parseInt(e.target.id)}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        folder_id: parseInt(e.target.id),
        user_id: grabUser.id
      })
    })
  }

  render() {
    const { folders, thisFolder, newFolderName, currentUser } = this.state
    console.log("app", this.state.users);

    return (
      // <Switch>
        // <Route
        //   path='/notes'
        //   component={null /*some page*/}
        //   render={routerProps => <NotesContainer routerProps={routerProps} /> } />
      //   <Route path='/' component={null /*some page*/} render={() => {}}/> EMPTY ONE AT THE BOTTOM!
      // in different shit this.props.history.push('/{someroute}')
      // <Link to='/{route}'>
      // </Switch>
      <div className="grid-container">
        <NavContainer
          newFolderName={this.newFolderName}
          addFolder={this.addFolder}
          changeFolder={this.changeFolder}
          deleteFolder={this.deleteFolder}
          folders={folders}
          user={currentUser}/>
        <NotesContainer
          folder={thisFolder}
          folders={folders}
          user={currentUser}
          addUser={this.addUser}
          addUserInput={this.addUserInput}/>
      </div>
    );
  }
}

export default App;
