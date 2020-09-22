import React from 'react';

import classes from './NavigationList.css';

import NavigationItem from './NavigationItems/NavigationItem';

const NavigationList = (props) => {
    return( 
        <ul className={classes.NavigationList}>
            <NavigationItem link='/' exact >Burger Builder</NavigationItem>
            <NavigationItem link='/orders'>My Orders</NavigationItem>
            <NavigationItem link='/auths'>Login/SignUp</NavigationItem>
        </ul>
    );
}

export default NavigationList;