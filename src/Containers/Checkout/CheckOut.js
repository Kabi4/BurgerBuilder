import React, { Component } from 'react';
import CheckoutSummary from '../../Components/Checkout Components/CheckoutSummary/CheckoutSummary';

import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{
    state = {
        indegridents: {
            bacon:0,
            salad:0,
            cheese:0,
            meat:0
        },
        totalPrice: 0
    }
    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        let newindegridents = {};
        let price = 0;
        for(let param of query.entries()){
            if(param[0]==='price'){
                price = param[1];
            }else{
                newindegridents[param[0]] = parseInt(param[1],10);
            }
        }
        this.setState({indegridents: newindegridents,totalPrice:price})
    }

    cancelPurchaseHandler=()=>{
        this.props.history.goBack();
    };

    continuePurchaseHandler=()=>{
        this.props.history.replace('./checkout/contact-data');
    }
    render(){
        return(
            <div>
                <CheckoutSummary indegridents={this.state.indegridents} cancelPurchaseHandler={this.cancelPurchaseHandler} continuePurchaseHandler={this.continuePurchaseHandler}/>
                <Route path={this.props.match.path+'/contact-data'} render={()=>(<ContactData indegridents={this.state.indegridents} totalPrice={this.state.totalPrice} {...this.props}/> )}/>
            </div>
        );
    }
}

export default Checkout;