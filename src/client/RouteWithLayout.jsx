import React, { Component } from 'react'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import { Route } from 'react-router'
import Notifications from 'react-notification-system-redux'

const styles = theme => ({
})

class RouteWithLayout extends Component {
  render() {
    const { component, ...props } = this.props

    return (
      <div>
        <Route exact {...props} render={() => React.createElement(component)} />
        <Notifications
          notifications={this.props.notifications}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    notifications: state.notifications,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(RouteWithLayout)

