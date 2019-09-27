import { combineReducers } from 'redux'
import { reducer as notifications } from 'react-notification-system-redux'
import { routerReducer } from 'react-router-redux'
import ui from './ui'

const rootReducer = combineReducers({
  ui,
  notifications,
  routing: routerReducer,
})

export default rootReducer
