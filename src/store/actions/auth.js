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

export const LOG_OUT = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    localStorage.removeItem("expiresIn");
    return{
        type: actionTypes.AUTH__LOGOUT
    };
};

const checkout__AUTH = (expireTime) => {
    return dispatch=>{
        setTimeout(()=>{
            dispatch(LOG_OUT());
        },expireTime*1000);
    };
};

const auto__login = (token,userID)=>{
    return{
        type: actionTypes.AUTO__AUTH,
        token: token,
        userID: userID
    };
};

export const auto__authentication = (token,userID,expiresIn)=>{
    return dispatch=>{
        dispatch(auto__login(token,userID));
        dispatch(checkout__AUTH(expiresIn));
    }
}

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
    
            const expiryDate = new Date(new Date().getTime() + res.data.expiresIn*1000);
            localStorage.setItem("token",res.data.idToken);
            localStorage.setItem("userID",res.data.localId);
            localStorage.setItem("expiresIn",expiryDate);
            dispatch(AUTH_SUCCESS(res.data));
            dispatch(checkout__AUTH(res.data.expiresIn));
        })
        .catch(err=>{
            dispatch(AUTH_FAILED(err.response.data.error));
        })
    };
};