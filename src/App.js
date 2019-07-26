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
    thisUser: [],
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
          thisUser,
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
    let findFolder = this.state.folders.filter(f=>{
      return f.id !== parseInt(e.currentTarget.id)
    })
    console.log(findFolder);
    fetch(FOLDER_API+`/${e.currentTarget.id}`, {
      method: "DELETE"})
    this.setState({
      folders: findFolder
    })
  }

  shareFolder = (e, username) => {
    e.preventDefault()
    window.confirm(`Share this folder with ${username}?`)
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
      .then(r=>r.json())
      .then(folder=>{
        this.componentDidMount()
      })
    }
  }

  editFolder = (folderName) => {
    let folder = this.state.thisFolder
    let folders = this.state.folders
    let notChanged = folders.filter(f=>{
      return f.id !== folder.id
    })
    fetch(FOLDER_API + `/${this.state.thisFolder.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: folderName
      })
    })
    .then(r=>r.json())
    .then(changed=>{
      this.componentDidMount()
      this.setState({
        folders: [...notChanged, changed],
        thisFolder: changed
      })
    })
  }

  logout = (e) => {
    localStorage.clear()
    this.setState({
      currentUser: []
    })
  }

  render() {
    console.log(this.state);
    const { folders, thisFolder, users, thisUser } = this.state

    if (!localStorage.getItem('username')) {
      return <LoginPage users={this.state.users} newUser={this.newUser} okToFetch={this.stopFuckingFetching} redirect={this.redirect} />
    }

    return (
      <div className="gridContainer">
        <div id="left-grid-container">
          <Header />
          <NavContainer
            newFolderName={this.newFolderName}
            addFolder={this.addFolder}
            changeFolder={this.changeFolder}
            deleteFolder={this.deleteFolder}
            folders={folders}
            user={thisUser}
            logout={this.logout}/>
          <div className="logoutBtnWrapper">
            <button className="logoutBtn" onClick={this.logout}>Logout</button>
          </div>
        </div>
          <NotesContainer
            folder={thisFolder}
            users={users}
            user={thisUser}
            shareFolder={this.shareFolder}
            editFolder={this.editFolder}/>
      </div>
    );
  }
}
