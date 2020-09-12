import React from 'react';

import classes from './Burger.css';

//import { withRouter } from 'react-router-dom';

import BurgerIndegrient from './Burger Indegrient/BurgerIndegrient';
//import BuildControls from './BuildControls/BuildControls';

const burger = (props) =>{
    // console.log(props.indegridents)
    let burgerMaterial = Object.keys(props.indegridents).map(igkeys=>{
        return ([...Array((props.indegridents[igkeys]))].map((_,i)=>{return <BurgerIndegrient key={igkeys+i} type={igkeys}/>}))
    });
    const materials = burgerMaterial.reduce((total,curr)=> total+curr.length,0);

    if(materials===0){
        burgerMaterial = [<p key="IndegridentN/A">Please Start Adding Indegrients!</p>]
    }
    // console.log(burgerMaterial)
    return(
        <div className={classes.Burger}>
            <BurgerIndegrient type="bread-top"/>
            {burgerMaterial}
            <BurgerIndegrient type="bread-bottom"/>
        </div>
    );
};

export default burger;