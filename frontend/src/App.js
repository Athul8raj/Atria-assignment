import React from 'react';
import './App.css';
import Dashboard from './Dashboard'
import { Route, Switch,Redirect } from 'react-router-dom';
import NotFound from './Error'


function App() {
  return (
    <div className="App">
      <Switch>
      <Route path="/" component={Dashboard} exact />
      <Route component={NotFound} /> {/* for all other url routes show 404 page*/}
      <Redirect to="/error" />
      </Switch>
    </div>
  );
}

export default App;
