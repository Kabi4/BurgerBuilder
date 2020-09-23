import React, { Component } from 'react';

import {Route, Switch ,withRouter ,Redirect} from 'react-router-dom';

import asyncLoading from './../Components/LazyLoading/asyncImportingModules';
import Layout from './../Components/Layout/Layout';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Logout from './Login(authentiaction)/Logout/Logout';

import { connect } from 'react-redux';

import * as actionCreators from './../store/actions/index';

const importCheckOut = asyncLoading(()=>{
  return import('./Checkout/CheckOut');
});

const importAuth = asyncLoading(()=>{
  return import('./Login(authentiaction)/auth');
});

const importOrders = asyncLoading(()=>{
  return import('./Orders/Orders');
});


class App extends Component {
  componentDidMount(){
    const token = localStorage.getItem("token") ;
    let expiresIn = localStorage.getItem("expiresIn") ;
    const userID = localStorage.getItem("userID") ;
    const current = new Date().getTime();
    expiresIn = new Date(expiresIn);
    if(token && current<expiresIn.getTime()){
      const expiry = (expiresIn.getTime() - current )/1000; 
      this.props.autoAuth(token,userID,expiry);
    }
  }
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/auths" component={importAuth}/>
            {this.props.auth?<Route path="/logout" component={Logout}/>:null}
            {this.props.auth?<Route path="/checkout" component={importCheckOut}/>:null}
            {this.props.auth?<Route path="/orders" component={importOrders}/>:null}
            <Route path="/" exact component={BurgerBuilder}/>
            <Redirect to="/"/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return{
    auth: state.auth.token!==null
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    autoAuth: (token,userid,expiry)=>{dispatch(actionCreators.auto__authentication(token,userid,expiry))}
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
