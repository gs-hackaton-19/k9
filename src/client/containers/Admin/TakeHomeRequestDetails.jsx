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

const styles = theme => ({
  root: {
    width: 'calc(100% - 32px)',
    minHeight: 'calc(100vh - 96px)',
    padding: '16px',
    backgroundColor: theme.palette.background.paper,
  },
  approveButton: {
    marginRight: '16px',
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
    const { classes, takeHomeRequest } = this.props;

    return (
      <Header title="Take home request details">
        <div className={classes.root}>
          {
            takeHomeRequest ?
              (
                <div>
                  <Typography variant="h2" gutterBottom>
                    Take home request details
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Pet name
                  </Typography>
                  <Typography variant="h4" gutterBottom>
                    {takeHomeRequest.pet.name}
                  </Typography>

                  <Typography variant="h6" gutterBottom>
                    User
                  </Typography>
                  <Typography variant="h4" gutterBottom>
                    Alice
                  </Typography>

                  <Typography variant="h6" gutterBottom>
                    Request date
                  </Typography>
                  <Typography variant="h4" gutterBottom>
                    {takeHomeRequest.requestDate}
                  </Typography>

                  {renderStatus(takeHomeRequest)}

                  <Button variant="contained" color="primary" className={classes.approveButton} onClick={() => this.approve()} disabled={takeHomeRequest.approved || takeHomeRequest.disapproved}>
                    Approve
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => this.deny()} disabled={takeHomeRequest.approved || takeHomeRequest.disapproved}>
                    Deny
                  </Button>
                </div>
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

