import React from 'react';

import classes from './Burger.css';

import BurgerIndegrient from './Burger Indegrient/BurgerIndegrient';

const burger = (props) =>{
    return(
        <div className={classes.Burger}>
            <BurgerIndegrient type="bread-top"/>
            <BurgerIndegrient type="meat"/>
            <BurgerIndegrient type="cheese"/>
            <BurgerIndegrient type="bread-bottom"/>
        </div>
    );
};

export default burger;