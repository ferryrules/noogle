import React from 'react';
import './App.css';
import NotesContainer from './NotesContainer.js'
import NavContainer from './NavContainer.js'
import Header from './Header.js'
import LoginPage from './LoginPage.js'
const USER_API = "http://localhost:3000/users"
const FOLDER_API = "http://localhost:3000/folders"

export default class App extends React.Component {

  state = {
    users: [],
    folders: [],
    thisFolder: [],
    currentUser: [],
    currentUsername: "",
    newFolder: ""
  }

  componentDidMount() {
    let user = localStorage.getItem('username')
    fetch(USER_API)
    .then(r=>r.json())
    .then(users=>{
      let thisUser = users.find(u=>u.username===user)
      if (!!thisUser) {
        this.setState({
          users,
          folders: thisUser.folders || [],
          thisFolder: thisUser.folders[0] || '',
          currentUser: thisUser.id || [],
          currentUsername: thisUser.username || ''
        })
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
      let folder = {
        name: myFolder.name,
        id: myFolder.id,
        notes: []
      }
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

  shareFolder = (e, username) => {
    e.preventDefault()
    let grabUser = this.state.users.find(u=>{
      return u.username === username
    })
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
    }
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
      <div className="gridContainer">
        <div className="leftGridContainer">
          <Header />
          <NavContainer
            newFolderName={this.newFolderName}
            addFolder={this.addFolder}
            changeFolder={this.changeFolder}
            deleteFolder={this.deleteFolder}
            folders={folders}
            user={currentUser}
            username={currentUsername}
            logout={this.logout}/>
        </div>
          <NotesContainer
          folder={thisFolder}
          folders={folders}
          users={users}
          user={currentUser}
          shareFolder={this.shareFolder}/>
      </div>
    );
  }
}
