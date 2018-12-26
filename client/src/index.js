import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom"

import App from './components/App'


class Main extends Component {
  render() {
    return (
      <Router>
          <Route path="/" render={
            ({ location }) => {
              const pattern = /\/room\// // for test
              let roomId
              if (location.pathname.match(pattern)) {
                roomId = location.pathname.slice(6, location.pathname.length)
                if (roomId) {
                  return <App roomId={parseInt(roomId)} />
                } else {
                  return <App roomId={false} />
                }
              }
              return <App roomId={false} />
            }
          } />
      </Router>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
