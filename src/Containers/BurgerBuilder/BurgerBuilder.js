import React, {Component} from 'react';

import Burger from '../../Components/Burger/Burger';

import Aux from './../../High Order Components/Auxillary';

class BurgerBuilder extends Component{
    render(){
        return(
            <Aux>
                <Burger/>
                <div>Build Controls</div>
            </Aux>
        );
    }
}

export default BurgerBuilder;