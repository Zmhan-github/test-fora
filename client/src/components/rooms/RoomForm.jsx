import React, { Component } from 'react'
import PropTypes from 'prop-types'

class RoomForm extends Component {
  onSubmit(e) {
    e.preventDefault()
    const node = this.refs.room
    const RoomName = node.value
    this.props.addRoom(RoomName)
    node.value = ''
  }
  render() {
    return (
      <form onSubmit={ this.onSubmit.bind(this) }>
        <div className="form-group">
          <input type="text" ref="room" className="form-control" placeholder="Добавить комнату" />
        </div>
      </form>
    )
  }
}

RoomForm.propTypes = {
  addRoom: PropTypes.func.isRequired
}

export default RoomForm