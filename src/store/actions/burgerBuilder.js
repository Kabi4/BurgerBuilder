import * as actionsTypes from './actionTypes';

export const addIndegridents = (ingName)=>{
    return{
        type: actionsTypes.ADD__INDEGRIDENTS,
        INGNAME: ingName
    }
};
export const removeIndegridents = (ingName)=>{
    return {
        type: actionsTypes.REMOVE__INDEGRIDENTS,
        INGNAME: ingName
    }
}

export const resetIndegridents = ()=>{
    return {
        type: actionsTypes.RESET__INDEGRIDENTS
    }
}