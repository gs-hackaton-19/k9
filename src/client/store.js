import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createHashHistory } from 'history'
import { routerMiddleware, routerActions } from 'react-router-redux'
import rootReducer from '../reducers'

const history = createHashHistory()

const configureStore = initialState => {
  // Redux Configuration
  const middleware = []
  const enhancers = []

  // Thunk Middleware
  middleware.push(thunk)

  // Router Middleware
  const router = routerMiddleware(history)
  middleware.push(router)

  // Socket.IO Middleware
  // const socketIo = io(SOCKET_ADDRESS)
  // const socketIoMiddleware = createSocketIoMiddleware(socketIo, "socket/")
  // middleware.push(socketIoMiddleware)

  // Redux DevTools Configuration
  const actionCreators = {
    ...routerActions,
    ...devices,
    ...preferences,
    ...settings,
    ...stream,
    ...tests,
    ...ui,
    ...user
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
  const store = createStore(initialState, enhancer)

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    )
  }

  return store
}

export default configureStore
