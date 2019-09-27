import React from 'react'
import { Switch } from 'react-router'
import App from './App'
import RouteWithLayout from './RouteWithLayout'
import Dashboard from './containers/Dashboard/Dashboard'
import TakeHomeRequestList from './containers/Admin/TakeHomeRequestList';

export default () => (
  <App>
    <Switch>
      <RouteWithLayout path="/admin" component={TakeHomeRequestList} />
      <RouteWithLayout path="/" component={Dashboard} />
    </Switch>
  </App>
)
