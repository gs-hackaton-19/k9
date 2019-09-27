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
      dispatch(uiActions.loadFinished());
      return;
    }
    dispatch(adminActions.loadTakeHomeRequestList(data));
    dispatch(uiActions.loadFinished());
  }
}

export function loadTakeHomeRequest(id) {
  return async (dispatch, getState) => {
    dispatch(uiActions.loadStarted());
    const { data, statusText } = await axios.get(`/api/takehomerequest/${id}`);
    if (statusText !== 'OK') {
      dispatch(Notifications.error({ title: 'Error during loading!', autoDismiss: 0, position: 'br' }));
      dispatch(uiActions.loadFinished());
      return;
    }
    dispatch(adminActions.loadTakeHomeRequest(data));
    dispatch(uiActions.loadFinished());
  }
}

export function approveTakeHomeRequest(id, fromList = false) {
  return async (dispatch, getState) => {
    dispatch(uiActions.loadStarted());
    const { statusText } = await axios.post(`/api/takehomerequest/${id}/approve`, {});
    if (statusText !== 'OK') {
      dispatch(Notifications.error({ title: 'Error during loading!', autoDismiss: 0, position: 'br' }));
      dispatch(uiActions.loadFinished());
      return;
    }

    if (fromList) {
      dispatch(loadTakeHomeRequests());
    }
    dispatch(uiActions.loadFinished());
  }
}

export function denyTakeHomeRequest(id, fromList = false) {
  return async (dispatch, getState) => {
    dispatch(uiActions.loadStarted());
    const { statusText } = await axios.post(`/api/takehomerequest/${id}/approve`, { approve: 'false' });
    if (statusText !== 'OK') {
      dispatch(Notifications.error({ title: 'Error during loading!', autoDismiss: 0, position: 'br' }));
      dispatch(uiActions.loadFinished());
      return;
    }

    if (fromList) {
      dispatch(loadTakeHomeRequests());
    }
    dispatch(uiActions.loadFinished());
  }
}

export function loadPets() {
  return async (dispatch, getState) => {
    dispatch(uiActions.loadStarted());
    const { data, statusText } = await axios.get('/api/pet');
    if (statusText !== 'OK') {
      dispatch(Notifications.error({ title: 'Error during loading!', autoDismiss: 0, position: 'br' }));
      dispatch(uiActions.loadFinished());
      return;
    }
    dispatch(uiActions.loadPetsList(data));
    dispatch(uiActions.loadFinished());
  }
}
