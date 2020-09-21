import * as actionType from  './../actions/actionTypes';

const initialState = {
    buying: false,
    err: false,
    succesfullyBuied:false
}

const orderReducer = (state=initialState,action)=>{
    switch(action.type){
        case actionType.PLACE_ORDER_SUCESSFULLY:
            return{
                ...state,
                buying: false,
                succesfullyBuied: true
            };
        case actionType.PLACE_ORDER_REJECTED:
            return{
                ...state,
                buying: false,
                err: true
            };
        case actionType.PLACING_ORDER_STARTED:
            return{
                ...state,
                buying: true
            };
        default:
            return state;
    }
}

export default orderReducer;