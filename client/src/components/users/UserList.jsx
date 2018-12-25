import React, { Component } from 'react'
import PropTypes from 'prop-types'

import User from './User'

class UserList extends Component {
  render() {
    const { users } = this.props
    return (
      <ul>
        {
          users.map(item =>
            <User key={item.id} user={item} />
          )
        }
      </ul>
    )
  }
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
}

export default UserList