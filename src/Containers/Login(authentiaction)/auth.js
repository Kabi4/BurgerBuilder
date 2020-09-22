import React, { Component } from 'react';
import Button from '../../Components/Button/Button';
import Spinner from '../../Components/Spinner/Spinner';
import Input from '../../Components/UI/Input/Input';
import { connect } from 'react-redux';

import * as actionCreators from './../../store/actions/index';

import classes from './auth.css'; 

class Auth extends Component{
    state = {
        customerInformation: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail'
                },
                elementValue: "",
                conditions:{
                    required: true,
                    email: true
                },
                isValid: false,
                haveChangedOnce: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                elementValue: "",
                conditions:{
                    required: true,
                    isnumbers: 6
                },
                isValid: false,
                haveChangedOnce: false
            }
        },
        isSignUp: false
    }

    inputChangeHandler = (e,id) =>{
        let form = {...this.state.customerInformation};
        form[id] = {
            ...this.state.customerInformation[id]
        };
        let isvalid =false;
        if(form[id].conditions){
            if(form[id].conditions.required){
                if((e.target.value).trim()!=='')isvalid=true;
                else isvalid=false;
            }
            if(form[id].conditions.email){
                let regex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                if(isvalid && regex.test(e.target.value))isvalid=true;
                else isvalid = false;
            }
            if(form[id].conditions.isnumbers){
                if(e.target.value.length>form[id].conditions.isnumbers)isvalid=true;
                else isvalid = false;
            }
        }
        form[id].haveChangedOnce = true;
        form[id].isValid = isvalid;
        form[id].elementValue = e.target.value;
        this.setState({customerInformation: form});
    }

    toggleSignMethodHandler = (e)=>{
        e.preventDefault();
        this.setState((prevState)=>{
            return {isSignUp: !prevState.isSignUp}
        })
    }

    render(){
        let title = "Sign Up";
        if(!this.state.isSignUp) title = "Sign In"
        const allInputElements = [];
        for(let key in this.state.customerInformation){
            allInputElements.push({
                id: key,
                config: this.state.customerInformation[key]
            })
        };
        let swichState = "Already Have a account? Sign In!";
        if(!this.state.isSignUp)swichState = "New to Burger Hub? Sign Up!";
        let form = (<form onSubmit={(e)=>{
            e.preventDefault();
            this.props.auth(this.state.customerInformation.email.elementValue,this.state.customerInformation.password.elementValue,this.state.isSignUp);
        }}>
            {allInputElements.map(ele=>{
                return <Input haveChangedOnce={ele.config.haveChangedOnce} isValid={ele.config.isValid} conditions={ele.config.conditions} changed={(e)=>{this.inputChangeHandler(e,ele.id);}}  key={ele.id} elementType={ele.config.elementType} elementConfig={ele.config.elementConfig} value={ele.config.elementValue}  />
            })}
            <Button type='Success'>{title}</Button><br/>
            <Button type='Danger' click={this.toggleSignMethodHandler}>{swichState}</Button>
        </form>);
        if(this.props.loading){
            form=(<Spinner/>);
        }
        let errorMessage = null;
        if(this.props.err)errorMessage = <Button isdisable={true} type="Danger">{(this.props.err.message).replaceAll("_"," ")}</Button>;
        return(
            <div className={classes.Auth}>
                <h4>{title}</h4>
                {errorMessage}
                {form}
            </div>
        );
    }
};

const mapStateToProps = (state)=>{
    return{
        loading: state.auth.loading,
        err: state.auth.err,
        userID: state.auth.userID,
        token: state.auth.token
    }
}

const mapDistpatchToProps = (dispatch)=>{
    return{
        auth: (email,password,SignUp)=>{dispatch(actionCreators.AUTH({email:email,password:password},SignUp))}
    };
}

export default connect(mapStateToProps,mapDistpatchToProps)(Auth);