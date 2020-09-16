import * as actions from './actionTypes';


const INDEGRIDENTS__PRICE = {
    bacon:0.7,
    salad:0.5, 
    cheese:0.4,
    meat:1.2
}

const intialState = {
    indegridents: {
        bacon:0,
        salad:0,
        cheese:0,
        meat:0
    },
    totalPrice: 1
}

const reducer = (state=intialState,action)=>{
    switch(action.type){
        case actions.ADD__INDEGRIDENTS:
            return{
                ...state,
                indegridents: {
                    ...state.indegridents,
                    [action.INGNAME]: state.indegridents[action.INGNAME]+=1
                },
                totalPrice: state.totalPrice+=INDEGRIDENTS__PRICE[action.INGNAME]
            };
        case actions.REMOVE__INDEGRIDENTS:
            return{
                ...state,
                indegridents: {
                    ...state.indegridents,
                    [action.INGNAME]: state.indegridents[action.INGNAME]-=1
                },
                totalPrice: state.totalPrice-=INDEGRIDENTS__PRICE[action.INGNAME]
            };
        default:
            return state;
    }
}

export default reducer;

