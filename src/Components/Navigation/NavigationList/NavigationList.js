import React from 'react';

import classes from './NavigationList.css';

import NavigationItem from './NavigationItems/NavigationItem';

const NavigationList = (props) => {
    return( 
        <ul className={classes.NavigationList}>
            <NavigationItem active={true} >Burger Builder</NavigationItem>
            <NavigationItem>CheckOut</NavigationItem>
        </ul>
    );
}

export default NavigationList;