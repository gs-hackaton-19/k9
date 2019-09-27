import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import compose from 'recompose/compose';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import {approveTakeHomeRequest, denyTakeHomeRequest, loadTakeHomeRequest} from '../../thunks';
import Header from '../Header/Header';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    width: 'calc(100% - 32px)',
    minHeight: 'calc(100vh - 96px)',
    padding: '16px',
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    marginRight: '16px',
  },
  details: {
    maxWidth: 'calc(50% - 128px)',
  },
  image: {
    maxWidth: '800px',
    maxHeight: 'calc(100vh - 128px)',
  }
});

const renderStatus = (takeHomeRequest) => {
  if (takeHomeRequest.approved || takeHomeRequest.disapproved) {
    return (
      <Typography variant="h4" gutterBottom>
        {takeHomeRequest.approved ? 'This request was approved' : 'This request was denied'}
      </Typography>
    );
  }
};

class TakeHomeRequestList extends Component {
  componentDidMount() {
    this.props.loadTakeHomeRequest(this.props.match.params.id);
  }

  approve() {
    this.props.approveTakeHomeRequest(this.props.match.params.id);
    this.props.loadTakeHomeRequest(this.props.match.params.id);
  }

  deny() {
    this.props.denyTakeHomeRequest(this.props.match.params.id);
    this.props.loadTakeHomeRequest(this.props.match.params.id);
  }

  render() {
    const { classes, takeHomeRequest, history } = this.props;

    return (
      <Header title="Take home request details">
        <div className={classes.root}>
          {
            takeHomeRequest ?
              (
                <Grid container justify="center" spacing={4}>
                  <Grid item className={classes.details}>
                    <div>
                      <Typography variant="h3" gutterBottom>
                        Take home request details
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Pet name
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        {takeHomeRequest.pet.name}
                      </Typography>

                      <Typography variant="body2" gutterBottom>
                        Description
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        {takeHomeRequest.pet.description}
                      </Typography>

                      <Typography variant="body2" gutterBottom>
                        User
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        Alice
                      </Typography>

                      <Typography variant="body2" gutterBottom>
                        Cage
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        {takeHomeRequest.pet.cageId}
                      </Typography>

                      <Typography variant="body2" gutterBottom>
                        Species
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        {takeHomeRequest.pet.species}
                      </Typography>

                      <Typography variant="body2" gutterBottom>
                        Breed
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        {takeHomeRequest.pet.breed}
                      </Typography>

                      <Typography variant="body2" gutterBottom>
                        Address
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        {takeHomeRequest.pet.address}
                      </Typography>

                      <Typography variant="body2" gutterBottom>
                        Age
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        {takeHomeRequest.pet.age}
                      </Typography>

                      <Typography variant="body2" gutterBottom>
                        Behavior
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        {takeHomeRequest.pet.behavior}
                      </Typography>

                      <Typography variant="body2" gutterBottom>
                        Sex
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        {takeHomeRequest.pet.sex}
                      </Typography>

                      <Typography variant="body2" gutterBottom>
                        Color
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        {takeHomeRequest.pet.color}
                      </Typography>

                      <Typography variant="body2" gutterBottom>
                        QR code
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        {takeHomeRequest.pet.qrCode}
                      </Typography>

                      <Typography variant="body2" gutterBottom>
                        Request date
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        {takeHomeRequest.requestDate}
                      </Typography>

                      {renderStatus(takeHomeRequest)}

                      <Button variant="contained" color="primary" className={classes.button} onClick={() => this.approve()} disabled={takeHomeRequest.approved || takeHomeRequest.disapproved}>
                        Approve
                      </Button>
                      <Button variant="contained" color="secondary" className={classes.button} onClick={() => this.deny()} disabled={takeHomeRequest.approved || takeHomeRequest.disapproved}>
                        Deny
                      </Button>
                      <Button onClick={history.goBack}>
                        Back
                      </Button>
                    </div>
                  </Grid>
                  <Grid item>
                    <img src={takeHomeRequest.pet.image} className={classes.image}/>
                  </Grid>
                </Grid>
              ):
              (
                <div>Not Found!</div>
              )
          }
        </div>
      </Header>
    );
  }
}

TakeHomeRequestList.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    takeHomeRequest: state.admin.takeHomeRequest,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadTakeHomeRequest,
    approveTakeHomeRequest,
    denyTakeHomeRequest,
  }, dispatch)
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(TakeHomeRequestList)
