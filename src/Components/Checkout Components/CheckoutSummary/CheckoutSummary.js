import React from 'react';

import classes from './CheckoutSummary.css'

import Burger from '../../Burger/Burger';
import Button from '../../Button/Button';

const CheckoutSummary = (props) =>{
    //console.log(props)
    return(
        <div className={classes.CheckoutSummary}>
            <h1>
                Hope It Taste Well.
            </h1>
            <div style={{height:"300px",width: "300px",margin: 'auto'}}>
                <Burger indegridents={props.indegridents}/>
            </div>
            <Button type="Danger" click={props.cancelPurchaseHandler}>CANCEL</Button>
            <Button type="Success" click={props.continuePurchaseHandler}>CONFIRM</Button>
        </div>
    );
}

export default CheckoutSummary;