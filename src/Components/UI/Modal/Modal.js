import React, { Component } from 'react';

import OrderSummary from './../../Burger/OrderSummary/OrderSummary';
import Aux from './../../../High Order Components/Auxillary';
import Backdrop from './../Backdrop/Backdrop';

import classes from './Modal.css';

class Modal extends Component{
    componentDidUpdate(){
        console.log("[Modal] Updating.....")
    }

    shouldComponentUpdate(nextprops,nextstate){
        return (nextprops.purchasingCondition!==this.props.purchasingCondition);
    }

    render(){
        return(
            <Aux>
                <Backdrop togglePurchasing={this.props.togglePurchasing} show={this.props.purchasingCondition}/>
                <div className={classes.Modal}
                    style={{transform: this.props.purchasingCondition?'TranslateY(0)':'translateY(-100vh)',
                            opacity: this.props.purchasingCondition?'1':0    }}
                    >
                    <OrderSummary price={this.props.price} purchaseCancel={this.props.togglePurchasing} indegridents={this.props.indegridents} />
                </div>
            </Aux>
        );
    }
}


export default Modal;