import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Notifications from 'react-notification-system-redux'
import './App.css';
import Dashboard from './containers/Dashboard'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Dashboard/>
        <Notifications
          notifications={this.props.notifications}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.ui.loading,
    notifications: state.notifications,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
