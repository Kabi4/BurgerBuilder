import * as actionsTypes from './../actions/actionTypes';

const initialState = {
    orders: [],
    loading: true,
    err: false
 };

 const fetchOrderReducer = (state=initialState,action)=>{
    switch (action.type){
        case actionsTypes.FETCH_ORDER_SUCCESS:
            return{
                ...state,
                orders: [
                    ...action.payload.orders
                ],
                loading:false 
            };
        case actionsTypes.FETCH_ORDER_FAILED:
            return{
                ...state,
                loading: false,
                err: true
            };
        default:
            return state;
    }
 }

 export default fetchOrderReducer;