import React from 'react';
import PropTypes from 'prop-types';

import classes from './BurgerIndetgrient.css'

const BurgerIndegrient = (props) =>{
    let indegrient = null;
    switch(props.type){
        case("bread-bottom"):
            indegrient=<div className={classes.BreadBottom}></div>;
            break;
        case("bread-top"):
        indegrient=(<div className={classes.BreadTop}>
            <div className={classes.Seeds1}></div>
            <div className={classes.Seeds2}></div>
            <div></div>
            </div>);
            break;
        case("meat"):
            indegrient=<div className={classes.Meat}></div>;
            break;
        case("cheese"):
            indegrient=<div className={classes.Cheese}></div>;
            break;
        case("salad"):
            indegrient=<div className={classes.Salad}></div>;
            break;
        case("bacon"):
            indegrient=<div className={classes.Bacon}></div>;
            break;
        default:
            indegrient = null;
    }
    return indegrient;
};

BurgerIndegrient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIndegrient;