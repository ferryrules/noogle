import React from 'react';
import './App.css';
import NotesContainer from './NotesContainer.js'
import NavContainer from './NavContainer.js'
import Header from './Header.js'
import LoginPage from './LoginPage.js'
import Signup from './Signup.js'
const USER_API = "http://localhost:3000/users"
const FOLDER_API = "http://localhost:3000/folders"

export default class App extends React.Component {

  state = {
    users: [],
    folders: [],
    thisFolder: [],
    currentUser: [],
    currentUsername: "",
    newFolder: "",
    shareFolderWithUser: ""
  }

  componentDidMount() {
    let user = localStorage.getItem('username')
    fetch(USER_API)
    .then(r=>r.json())
    .then(users=>{
      this.setState({
        users
      })
    })
    .then(users=>{
      if (!!user) {
        this.stopFuckingFetching(user)
      }
    })
  }

  newUser = (user) => {
    this.setState({
      users: [...this.state.users, user]
    })
  }

  stopFuckingFetching = (username) => {
    let user = this.state.users.find(u=>u.username===username)
    localStorage.setItem('username', user.username)

    this.setState({
      folders: user.folders,
      thisFolder: user.folders[0] || '',
      currentUser: user.id,
      currentUsername: user.username
    })
  }

  newFolderName = (e) => {
    // console.log(e.target.value);
    this.setState({
      newFolder: e.target.value
    })
  }

  addFolder = (e) => {
    e.preventDefault()
    // console.log(this.state.newFolderName);
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
      // console.log(myFolder);
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
    // console.log(e.target.id);
    let findFolder = this.state.folders.filter(f=>{
      return f.id !== parseInt(e.target.id)
    })
    fetch(FOLDER_API+`/${e.target.id}`, {
      method: "DELETE"})
    this.setState({
      folders: findFolder
    })
  }

  shareFolder = (e) => {
    e.preventDefault()
    // console.log(e.target.id);
    let grabUser = this.state.users.find(u=>{
      return u.username === this.state.shareFolderWithUser
    })
    // console.log("grabUser", grabUser);
    if (grabUser) {
      fetch(FOLDER_API+`/${this.state.thisFolder.id}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          folder_id: this.state.thisFolder.id,
          user_id: grabUser.id
        })
      })
      this.setState({
        addUserInput: ""
      })
    }
  }

  shareWithUser = (e) => {
    // console.log(e.target.value);
    this.setState({
      shareFolderWithUser: e.target.value
    })
  }

  logout = (e) => {
    localStorage.clear()
    this.setState({
      currentUser: []
    })
  }

  render() {
    const { folders, thisFolder, users, currentUser, currentUsername } = this.state

    if (!localStorage.getItem('username')) {
      return <LoginPage users={this.state.users} newUser={this.newUser} okToFetch={this.stopFuckingFetching} redirect={this.redirect} />
    }

    return (
      <div className="grid-container">
        <Header logout={this.logout}/>
        <NavContainer
          newFolderName={this.newFolderName}
          addFolder={this.addFolder}
          changeFolder={this.changeFolder}
          deleteFolder={this.deleteFolder}
          folders={folders}
          user={currentUser}
          username={currentUsername}/>
        <NotesContainer
          folder={thisFolder}
          folders={folders}
          users={users}
          user={currentUser}
          shareWithUser={this.shareWithUser}
          shareFolder={this.shareFolder}/>
      </div>
    );
  }
}
