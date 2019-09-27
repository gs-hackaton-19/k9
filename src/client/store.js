import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import rootReducer from './reducers'
import ui from './actions/ui'

const browserHistory = createBrowserHistory()

const configureStore = (initialState = {}) => {
  // Redux Configuration
  const middleware = []
  const enhancers = []

  // Thunk Middleware
  middleware.push(thunk)

  // Router Middleware
  middleware.push(routerMiddleware(browserHistory))

  // Redux DevTools Configuration
  const actionCreators = {
    ...ui,
  }

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
      actionCreators,
    })
    : compose

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware))
  const enhancer = composeEnhancers(...enhancers)

  // Create Store
  const store = createStore(rootReducer, initialState, enhancer)

  const history = syncHistoryWithStore(browserHistory, store)

  if (module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(require('./reducers'))
    )
  }

  return { store, history }
}

export default configureStore
