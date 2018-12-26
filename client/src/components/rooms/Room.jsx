import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class Room extends Component {
  onClick(e) {
    e.preventDefault()
    const { setRoom, room } = this.props
    setRoom(room)
    this.props.history.push(`/room/${room.id}`)
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

export default withRouter(Room)