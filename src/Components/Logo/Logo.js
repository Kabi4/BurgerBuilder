import React from 'react';

import logoIco from './../../Assets/Images/Logo.png';

import classes from './Logo.css';

const Logo = (props) =>{
    return(
        <div className={classes.Logo}>
            <img src={logoIco} alt="My Burger Logo"/>
        </div>
    );
};

export default Logo;