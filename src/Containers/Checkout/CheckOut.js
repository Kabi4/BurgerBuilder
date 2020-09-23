import React, { Component } from 'react';
import CheckoutSummary from '../../Components/Checkout Components/CheckoutSummary/CheckoutSummary';

import { Route,Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

import { connect } from 'react-redux';

class Checkout extends Component{
    state = {
        disableConfirm: false
    }

    toogleConfirm = ()=>{
        this.setState({disableConfirm: true})
    }

    cancelPurchaseHandler=()=>{
        this.props.history.goBack();
    };

    continuePurchaseHandler=()=>{
        this.toogleConfirm();
        this.props.history.replace('./checkout/contact-data');
    } 
    render(){
        let summary = <div key="summary" >
        <CheckoutSummary disbaleConfirm={this.state.disableConfirm} indegridents={this.props.ing} cancelPurchaseHandler={this.cancelPurchaseHandler} continuePurchaseHandler={this.continuePurchaseHandler}/>
        <Route path={this.props.match.path+'/contact-data'} render={()=>(<ContactData userid={this.props.userID} indegridents={this.props.ing} totalPrice={this.props.price} {...this.props}/> )}/>
    </div>;
        if(this.props.price<2.02||this.props.buiedSucessfully){
            summary = <Redirect  key="summary" to="/"/>;
        }
        return(
            [summary]
        );
    }
}

const mapStateToProps = (state)=>{
    return{
        ing: state.burgerBuilder.indegridents,
        price: state.burgerBuilder.totalPrice,
        buiedSucessfully: state.order.succesfullyBuied,
        userID: state.auth.userID
    }
}

export default connect(mapStateToProps)(Checkout);



















































// componentDidMount(){
//     const query = new URLSearchParams(this.props.location.search);
//     let newindegridents = {};
//     let price = 0;
//     for(let param of query.entries()){
//         if(param[0]==='price'){
//             price = param[1];
//         }else{
//             newindegridents[param[0]] = parseInt(param[1],10);
//         }
//     }
//     this.setState({indegridents: newindegridents,totalPrice:price})
// }