import React from 'react'
import { Switch } from 'react-router'
import RouteWithLayout from './RouteWithLayout'
import Dashboard from './containers/Dashboard/Dashboard'
import TakeHomeRequestList from './containers/Admin/TakeHomeRequestList';

export default () => (
  <Switch>
    <RouteWithLayout path="/admin" component={TakeHomeRequestList} />
    <RouteWithLayout path="/dashboard" component={Dashboard} />
  </Switch>
)
