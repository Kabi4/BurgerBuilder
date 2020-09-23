import React from 'react';

import classes from './NavigationList.css';

import NavigationItem from './NavigationItems/NavigationItem';

const NavigationList = (props) => { 
    return( 
        <ul className={classes.NavigationList}>
            <NavigationItem link='/' exact >Burger Builder</NavigationItem>
            {props.auth?<NavigationItem link='/orders'>My Orders</NavigationItem>:null}
            {props.auth?<NavigationItem link='/logout'>LOGOUT</NavigationItem>:<NavigationItem link='/auths'>Login/SignUp</NavigationItem>}
        </ul>
    );
}

export default NavigationList;