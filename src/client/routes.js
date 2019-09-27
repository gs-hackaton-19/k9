import React from 'react'
import { Switch } from 'react-router'
import App from './containers/App'
import RouteWithLayout from './containers/RouteWithLayout'
import Dashboard from './containers/Dashboard'

export default () => (
  <App>
    <Switch>
      <RouteWithLayout path="/" component={Dashboard} />
    </Switch>
  </App>
)
