import React from 'react';
import './App.css';
import NotesContainer from './NotesContainer.js'
import NavContainer from './NavContainer.js'
import { Switch, Route } from 'react-router-dom'
const API = "http://localhost:3000/users"

class App extends React.Component {
  state = {
    thisFolder: 1,
    folders: []
  }

  componentDidMount() {
    fetch(API)
    .then(r => r.json())
    .then(users => {
      console.log(users);
    })
  }

  changeFolder = (e) => {
    console.log(e.target.id);
  }

  render() {
    const { folders, thisFolder } = this.state
    console.log(this.state);
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
        <NavContainer changeFolder={this.changeFolder} folders={folders}/>
        <NotesContainer folder={thisFolder} folders={folders} />
      </div>
    );
  }
}

export default App;
