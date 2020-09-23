import * as actionTypes from './actionTypes';
import * as actionCreator from './index';

import axios from 'axios';

export const PLACE_ORDER_SUCESS = () =>{
    return {
        type: actionTypes.PLACE_ORDER_SUCESSFULLY
    }
}

export const PLACE_ORDER_REJECT = () =>{
    return {
        type: actionTypes.PLACE_ORDER_REJECTED
    }
}

export const PLACING_ORDER_STARTED = () =>{
    return {
        type: actionTypes.PLACING_ORDER_STARTED
    }
}

export const PLACING_ORDER = (order,token) =>{
    return dispatch=>{
        dispatch(actionCreator.resetIndegridents());
        dispatch(PLACING_ORDER_STARTED());
        axios.post('https://my-burger-builder-8fe87.firebaseio.com/order.json?auth='+token,order)
        .then((Response)=>{
            dispatch(PLACE_ORDER_SUCESS());
        })
        .catch(err=>{
            dispatch(PLACE_ORDER_REJECT());
        })
    }
}