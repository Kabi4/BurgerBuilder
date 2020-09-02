import React from 'react';

import Aux from './../../High Order Components/Auxillary';

const Layout = (props) =>{
    return (
        <Aux>
            <div>Toolbar,Sidbar,Backdrop</div>
            <main>
                {props.children}
            </main>
        </Aux>
    );
}

export default Layout;