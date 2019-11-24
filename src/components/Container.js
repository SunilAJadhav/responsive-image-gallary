import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './Home';
import Details from './Details';

const Container = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/:id" component={Details}/>
            </Switch>
      </BrowserRouter>
   </React.Fragment>
  );
  }

export default Container;