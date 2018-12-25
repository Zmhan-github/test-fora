import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MessageList from './MessageList'
import MessageForm from './MessageForm'

class MessageSection extends Component {
  render(){
    let {activeRoom} = this.props
    return (
      <div className="messages-container panel panel-default">
        <div className="panel-heading">
          <strong>{ activeRoom.name }</strong>
        </div>
        <div className="panel-body messages">
          <MessageList { ...this.props } />
          <MessageForm { ...this.props } />
        </div>
      </div>
    )
  }
}

MessageSection.propTypes = {
  messages: PropTypes.array.isRequired,
  activeRoom: PropTypes.object.isRequired,
  addMessage: PropTypes.func.isRequired
}

export default MessageSection