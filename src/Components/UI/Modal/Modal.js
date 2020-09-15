import React, { Component } from 'react';

import OrderSummary from './../../Burger/OrderSummary/OrderSummary';
import Aux from './../../../High Order Components/Auxillary';
import Backdrop from './../Backdrop/Backdrop';

import classes from './Modal.css';

class Modal extends Component{
    componentDidUpdate(){
        //console.log("[Modal] Updating.....")
    }

    shouldComponentUpdate(nextprops,nextstate){
        return (nextprops.purchasingCondition!==this.props.purchasingCondition || (nextprops.buyingCondition&&nextprops.purchasingCondition));
    }

    render(){
        return(
            <Aux>
                <Backdrop togglePurchasing={this.props.togglePurchasing} show={this.props.purchasingCondition||this.props.buyingCondition}/>
                {this.props.children===undefined?<div className={classes.Modal}
                    style={{transform: this.props.purchasingCondition?'TranslateY(0)':'translateY(-100vh)',
                            opacity: this.props.purchasingCondition?'1':0    }}
                    >
                    <OrderSummary price={this.props.price} buyingHandler={this.props.buyingHandler} purchaseCancel={this.props.togglePurchasing} indegridents={this.props.indegridents} />
                </div>:null}
                <div className={classes.Modal}
                    style={{transform: this.props.buyingCondition?'TranslateY(0)':'translateY(0)',
                            opacity: this.props.buyingCondition?'1':"0",
                            backgroundColor: "transparent",
                            border: "none",
                            boxShadow: "none"}}
                    >{this.props.children}</div>
            </Aux>
        );
    }
}


export default Modal;