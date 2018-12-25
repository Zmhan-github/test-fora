import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RoomForm from './RoomForm'
import RoomList from './RoomList'

class RoomSection extends Component {
  render() {
    return (
      <div className="support panel panel-primary">
        <div className="panel-heading">
          <strong>Комнаты</strong>
        </div>
        <div className="panel-body rooms">
          <RoomList {...this.props}/>
          <RoomForm {...this.props}/>
        </div>
      </div>
    )
  }
}

RoomSection.propTypes = {
  rooms: PropTypes.array.isRequired,
  setRoom: PropTypes.func.isRequired,
  addRoom: PropTypes.func.isRequired,
  activeRoom: PropTypes.object.isRequired
}

export default RoomSection