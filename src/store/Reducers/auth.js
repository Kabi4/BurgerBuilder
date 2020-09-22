import * as actionTypes from './../actions/actionTypes';

const intialState = {
    loading: false,
    err: null,
    userID: null,
    token: null
};

const auth= (state=intialState,action)=>{
    switch(action.type){
        case actionTypes.AUTH__STARTED:
            return {
                ...state,
                loading: true
            };
        case actionTypes.AUTH__SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.authData.idToken,
                userID: action.authData.localId
            };
        case actionTypes.AUTH__FAILED:
            return{
                ...state,
                err: action.err,
                loading: false
            }
        default:
            return state;
    }
}

export default auth;