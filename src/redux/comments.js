import * as ActionsTypes from './ActionTypes';

export const Comments = (state= {
    errMess: null,
    comments: []
}, action) =>{
    switch(action.type){
        case ActionsTypes.ADD_COMMENT:
            let comment= action.payload;
            comment.id=state.comments.length;
            comment.date=new Date().toISOString();
            return {...state,comments: state.comments.contact(comment)}

        case ActionsTypes.ADD_COMMENTS:
            return {...state, isLoading: false, errMess: null, comments: action.payload};

        case ActionsTypes.COMMENTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, comments: []};   
        default:
            return state;
    }
}