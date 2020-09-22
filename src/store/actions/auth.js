import axios from 'axios';
import * as actionTypes from './actionTypes';

const AUTH_SUCCESS = (data)=>{
    return {
        type: actionTypes.AUTH__SUCCESS,
        authData: data
    };
} ;

const AUTH_FAILED = (err) =>{
    return {
        type: actionTypes.AUTH__FAILED,
        err: err
    };
};

const AUTH_START = () => {
    return{
        type: actionTypes.AUTH__STARTED
    };
};

export const AUTH = (data,isSignUp) => {
    return dispatch=>{
        dispatch(AUTH_START());
        const authData = {
            ...data,
            returnSecureToken: true
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBuo5Hf7RZpNPO9h_33YlH9R7iig_NYjc0";
        if(isSignUp) url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBuo5Hf7RZpNPO9h_33YlH9R7iig_NYjc0";
        axios.post(url,authData)
        .then(res=>{
            dispatch(AUTH_SUCCESS(res.data));
        })
        .catch(err=>{
            dispatch(AUTH_FAILED(err.response.data.error));
        })
    };
};