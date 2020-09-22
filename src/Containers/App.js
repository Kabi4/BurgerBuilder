import React, { Component } from 'react';

import {Route, Switch} from 'react-router-dom';

import Layout from './../Components/Layout/Layout';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Checkout from './Checkout/CheckOut';
import Auth from './Login(authentiaction)/auth';
import Orders from './Orders/Orders';


class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/auths" component={Auth}/>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/orders" component={Orders}/>
            <Route path="/" exact component={BurgerBuilder}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
