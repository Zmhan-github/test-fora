import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Room extends Component {
  onClick(e) {
    e.preventDefault()
    const { setRoom, room } = this.props
    setRoom(room)
  }
  render() {
    const { room, activeRoom } = this.props
    const active = room === activeRoom ? 'active' : ''
    return (
      <li className={active}>
        <a href="/" onClick={ this.onClick.bind(this) }>{ room.name }</a>
      </li>
    )
  }
}

Room.propTypes = {
  room: PropTypes.object.isRequired,
  setRoom: PropTypes.func.isRequired,
  activeRoom: PropTypes.object.isRequired
};

export default Room