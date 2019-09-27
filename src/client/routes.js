import React from 'react'
import { Switch, Route } from 'react-router'
import RouteWithLayout from './RouteWithLayout'
import Redirector from './containers/Redirector/Redirector'
import Dashboard from './containers/Dashboard/Dashboard'
import TakeHomeRequestList from './containers/Admin/TakeHomeRequestList';
import TakeHomeRequestDetails from './containers/Admin/TakeHomeRequestDetails';

export default () => (
  <Switch>
    <RouteWithLayout path="/admin/takeHome/:id" component={TakeHomeRequestDetails} />
    <RouteWithLayout path="/admin" component={TakeHomeRequestList} />
    <RouteWithLayout path="/dashboard" component={Dashboard} />
    <Route path="/" component={Redirector} />
  </Switch>
)
