import React from 'react';

import classes from './Layout.css';

import Aux from './../../High Order Components/Auxillary';

import Toolbar from './../Navigation/Toolbar/Toolbar';

const Layout = (props) =>{
    return (
        <Aux>
            <Toolbar/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
}

export default Layout;