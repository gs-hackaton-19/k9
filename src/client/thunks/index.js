import axios from 'axios'
import Notifications from 'react-notification-system-redux'
import * as uiActions from '../actions/ui'
const ENDPOINT = '/pets/'

export function testThunk() {
  return (dispatch, getState) => {
    dispatch(uiActions.loadStarted())
    dispatch(uiActions.loadFinished())
  }
}