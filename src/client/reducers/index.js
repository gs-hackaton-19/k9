import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as notifications } from 'react-notification-system-redux'
import ui from './ui'

const rootReducer = combineReducers({
  ui,
  notifications,
  router
})

export default rootReducer
