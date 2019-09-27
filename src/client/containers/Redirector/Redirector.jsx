// @flow
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { push } from 'react-router-redux'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
})
export class Dashboard extends Component {
  componentDidMount() {
    this.props.pushNavigation("/dashboard")
  }

  render() { return <div />}
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    pushNavigation: push,
  }, dispatch)
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Dashboard)

