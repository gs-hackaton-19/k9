// @flow
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({

});
export class MapTest extends Component {
  constructor() {
    super();
  }

  render() {

    return (
      <div>
        Google Maps
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(MapTest)

