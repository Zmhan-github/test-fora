import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Room from './Room'

class RoomList extends Component {
  render() {
    const { rooms } = this.props
    return (
      <ul>
        {
          rooms.map(item =>
            <Room key={item.id} room={item} {...this.props} />
          )
        }
      </ul>
    )
  }
}

RoomList.propTypes = {
  rooms: PropTypes.array.isRequired,
  setRoom: PropTypes.func.isRequired,
  activeRoom: PropTypes.object.isRequired
}

export default RoomList