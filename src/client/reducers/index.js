import { combineReducers } from 'redux'
import { reducer as notifications } from 'react-notification-system-redux'
import { routerReducer } from 'react-router-redux'
import ui from './ui'
import admin from './admin'

const rootReducer = combineReducers({
  ui,
  admin,
  notifications,
  routing: routerReducer,
})

export default rootReducer
