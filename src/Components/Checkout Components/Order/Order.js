import React from 'react';

import classes from './Order.css'

const Order = (props)=>{
    
    const Indegridents = [];
    for(let ele in props.ind){
        Indegridents.push({
            name: ele,
            number: props.ind[ele]
        });
    }
    const description = Indegridents.map((ele,i)=>{
        return <span style={{
            textTransform: "capitalize",
            display: "inline-block",
            margin: "0 8px",
            border: "1px solid grey",
            padding: '5px'

        }} 
            key={ele.name}>{ele.name}: ({ele.number})</span>
    });
    return(
        <div className={classes.Order}>
            <p>Indegridents: {description}</p>
            <p>Price: <strong>USD {props.price}</strong></p>
        </div>
    );
};

export default Order;