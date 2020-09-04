import React from 'react';

import classes from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Bacon',type: "bacon"},
    {label: 'Salad',type: "salad"},
    {label: 'Cheese',type: "cheese"},
    {label: 'Meat',type: "meat"}
]

const BuildControls = (props) =>{
    return(
        <div className={classes.BuildControls}>
            <p>Current Price: <b>{props.price}$</b></p>
            {controls.map(ele=>{
                return <BuildControl 
                key={ele.type} 
                label={ele.label}
                add = {()=>{props.addIndegridents(ele.type)}}
                remove = {()=>{props.removeIndegridents(ele.type)}}
                isDisabled = {props.disabledKeys[ele.type]}
                />;
            })}
            <button className={classes.OrderButton} onClick={props.tooglePurchase} disabled={props.isNotPurchaseable}>ORDER NOW!</button>
        </div>
    );
};

export default BuildControls;