import React from 'react'
import { Switch } from 'react-router'
import App from './App'
import RouteWithLayout from './RouteWithLayout'
import Dashboard from './containers/Dashboard/Dashboard'

export default () => (
  <App>
    <Switch>
      <RouteWithLayout path="/" component={Dashboard} />
    </Switch>
  </App>
)
