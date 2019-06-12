import React, { Component } from 'react';

export default class Notes extends Component {

  render() {
    return (
      <div className="note">
        <div>
          <li>{this.props.note}</li>
        </div>
      </div>
    )
  }
}
