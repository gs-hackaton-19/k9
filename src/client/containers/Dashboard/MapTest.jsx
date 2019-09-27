// @flow
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const AnyReactComponent = ({ text }) => <div class='google.maps.Marker'>{text}</div>;

const styles = theme => ({

});

export class MapTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: -25.363,
      lng: 131.044,
      marker_text: "Kuty"
    }
  }

  render() {
    return (
      <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: this.state.lat, lng: this.state.lng}}
        >
          <Marker position={{ lat: this.state.lat, lng: this.state.lng}} />
        </Map>
    )
  }
}

function mapStateToProps(state) {
  return {
    apiKey: 'AIzaSyAfxDsmfHbRdZexPRLm_wJbwme1rQ23-vo'
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  GoogleApiWrapper(mapStateToProps)
)(MapTest)

const mapStyles = {
  width: '100%',
  height: '100%',
};
