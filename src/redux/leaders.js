import * as ActionsTypes from './ActionTypes';

export const Leaders = (state = {
    isLoading: true,
    errMess: null,
    leaders: []
}, action) =>{
    switch(action.type){
        case ActionsTypes.ADD_LEADERS:
            return {...state, isLoading: false, errMess: null, leaders: action.payload};

        case ActionsTypes.LEADERS_LOADING:
            return {...state, isLoading: true, errMess: null, leaders: []};

        case ActionsTypes.LEADERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, leaders: []};

        default:
            return state;
    }
}