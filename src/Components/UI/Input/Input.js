import React from 'react';

import classes from './Input.css'

const Input = (props)=>{
    let inputelement = null;
    let applyclasses = [classes.Inputelement];
    if(props.haveChangedOnce && props.conditions && props.isValid===false){
        applyclasses.push(classes.Invalid);
    }
    if(props.haveChangedOnce && props.conditions && props.isValid===true ){
        applyclasses.push(classes.Valid);
    }
    switch(props.elementType){
        case ('input'):
            inputelement = <input onChange={props.changed} className={applyclasses.join(" ")} {...props.elementConfig} value={props.elementValue}/>
            break;
        case ('textarea'):
            inputelement = <textarea onChange={props.changed} className={applyclasses.join(" ")} {...props.elementConfig} value={props.elementValue}/>
            break;
        case ('select'):
            inputelement = (
                <select onChange={props.changed} className={applyclasses.join(" ")} value={props.elementValue}>
                    {props.elementConfig.options.map(ele=>{
                        return (<option key={ele.displayValue} value={ele.value}>{ele.displayValue}</option>);
                    })}
                </select>
            )
            break;
        default:
            inputelement = <input onChange={props.changed} className={applyclasses.join(" ")} {...props.elementConfig} value={props.elementValue}/>
            break;
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputelement}
        </div>
    );
}

export default Input;