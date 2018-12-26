import React, { Component } from 'react'
import PropTypes from 'prop-types'


class UserForm extends Component {
  onSubmit(e) {
    e.preventDefault()
    const node = this.refs.userName
    const userName = node.value
    this.props.setUserName(userName)
    node.value = ''
  }
  render() {
    return (
      <form onSubmit={ this.onSubmit.bind(this)}>
        <div className="form-group">
          <input type="text"
            ref="userName"
            className="form-control"
            placeholder="Введите ваше имя"
          />
        </div>
      </form>
    )
  }
}

UserForm.propTypes = {
  setUserName: PropTypes.func.isRequired,
}

export default UserForm