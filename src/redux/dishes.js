import * as ActionsTypes from './ActionTypes';
export const Dishes = (state = {
    isLoading: true,
    errMess: null,
    dishes: []
}, action) =>{
    switch(action.type){
        case ActionsTypes.ADD_DISHES:
            return {...state, isLoading: false, errMess: null, dishes: action.payload};

        case ActionsTypes.DISHES_LOADING:
            return {...state, isLoading: true, errMess: null, dishes: []};

        case ActionsTypes.DISHES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, dishes: []};

        default:
            return state;
    }
}