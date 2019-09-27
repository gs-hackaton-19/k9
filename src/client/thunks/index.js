import axios from 'axios'
import Notifications from 'react-notification-system-redux'
import * as uiActions from '../actions/ui'
import * as adminActions from '../actions/admin'
const ENDPOINT = '/pets/'

export function testThunk() {
  return (dispatch, getState) => {
    dispatch(uiActions.loadStarted())
    dispatch(uiActions.loadFinished())
  }
}

export function loadTakeHomeRequests() {
  return async (dispatch, getState) => {
    dispatch(uiActions.loadStarted());
    const { data, statusText } = await axios.get('/api/takehomerequest');
    if (statusText !== 'OK') {
      dispatch(Notifications.error({ title: 'Error during loading!', autoDismiss: 0, position: 'br' }));
    }
    dispatch(adminActions.loadFinished(data));
    dispatch(uiActions.loadFinished());
  }
}
