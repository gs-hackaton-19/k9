import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import compose from 'recompose/compose';
import {connect} from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';

import { loadTakeHomeRequests, approveTakeHomeRequest, denyTakeHomeRequest } from '../../thunks';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

class TakeHomeRequestList extends Component {
  componentDidMount() {
    this.props.loadTakeHomeRequests();
  }

  approve(requestId) {
    console.log('approve', requestId);
    this.props.approveTakeHomeRequest(requestId);
  }

  deny(requestId) {
    console.log('deny', requestId);
    this.props.denyTakeHomeRequest(requestId);
  }

  render() {
    const { classes, takeHomeRequests } = this.props;

    return (
      <div className={classes.root}>
        <List component="nav">
          {takeHomeRequests.map(({ _id, pet }) => (
            <ListItem key={_id}>
              <ListItemAvatar>
                <Avatar src={pet.image} />
              </ListItemAvatar>

              <ListItemLink href="#simple-list">
                <ListItemText primary={pet.name} secondary="User: Alice"/>
              </ListItemLink>

              <ListItemSecondaryAction>
                <IconButton aria-label="Approve" onClick={() => this.approve(_id)}>
                  <DoneIcon />
                </IconButton>
                <IconButton aria-label="Deny"  onClick={() => this.deny(_id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

TakeHomeRequestList.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    takeHomeRequests: state.admin.takeHomeRequests,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadTakeHomeRequests,
    approveTakeHomeRequest,
    denyTakeHomeRequest,
  }, dispatch)
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(TakeHomeRequestList)

