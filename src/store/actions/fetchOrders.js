import * as actionTypes from './actionTypes';

import axios from 'axios';

const FETCHING__ORDER__SUCCESS = (fecthedOrder)=>{
    return{
        type: actionTypes.FETCH_ORDER_SUCCESS,
        payload:{
            orders: fecthedOrder
        }
    }
}

const FECHING__ORDER__FAILED = ()=>{
    return{
        type: actionTypes.FETCH_ORDER_FAILED
    }
}

export const FETCHING__ORDER = (Token,userid)=>{
        const query = `?auth=${Token}&orderBy="userid"&equalTo="${userid}"`;
        return dispatch=>{
        axios.get('https://my-burger-builder-8fe87.firebaseio.com/order.json'+query)
        .then((Response)=>{
            let fetchOrders = [];
            for(let key in Response.data){
                fetchOrders.push({
                    ...Response.data[key],
                    id: key
                });
            }
            dispatch(FETCHING__ORDER__SUCCESS(fetchOrders));
        })
        .catch((err)=>{
            dispatch(FECHING__ORDER__FAILED());
        })
    };
}