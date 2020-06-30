import * as ActionsTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';

export const addComment =  (comment) =>({
    type: ActionsTypes.ADD_COMMENT,
    payload: comment
});
export const postComment = (dishId, rating, author, comment) => (dispatch)=>{
    const newComment = {
            dishId,
            rating,
            author,
            comment
        }
    newComment.date=new Date().toISOString();

    return fetch(baseUrl+'comments',{
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type':'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response=>{
        if(response.ok){
            return response;
        }
        else {
            var error = new Error('Error '+response.status+': '+response.statusText);
            error.response=response;
            throw error;
        }
    },
    error=>{
        var errMess=new Error(error.message);
        throw errMess;
    })
    .then(response=> response.json())
    .then(response=> dispatch(addComment(response)))
    .catch(error => {
        console.log('Post Comments', error.message);
        alert("Your comment could not be posted\nError: "+error.message);
    })
}

export const postFeedback = (feedback) => (dispatch)=>{
    alert("Test "+JSON.stringify(feedback));
    const newFeedback = {...feedback};
    newFeedback.date=new Date().toISOString();
    return fetch(baseUrl+'feedback',{
        method: 'POST',
        body: JSON.stringify(newFeedback),
        headers: {
            'Content-Type':'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response=>{
        if(response.ok){
            return response;
        }
        else {
            var error = new Error('Error '+response.status+': '+response.statusText);
            error.response=response;
            throw error;
        }
    },
    error=>{
        var errMess=new Error(error.message);
        throw errMess;
    })
    .then(response=> response.json())
    .then(response=> {
        dispatch(showFeedback(response))
        alert("Feedback posted: "+JSON.stringify(feedback))
    })
    .catch(error => {
        console.log('Feedback', error.message);
        alert("Your feedback could not be posted\nError: "+error.message);
    })
}

export const showFeedback= (feedback) => {
    return {
        type: ActionsTypes.SHOW_FEEDBACK,
        payload: feedback
    }
}
export const fetchDishes = () => dispatch => {
    dispatch(dishesLoading(true));
    
    return fetch(baseUrl+'dishes')
            .then(response=>{
                if(response.ok){
                    return response;
                }
                else {
                    var error = new Error('Error '+response.status+': '+response.statusText);
                    error.response=response;
                    throw error;
                }
            },
            error=>{
                var errMess=new Error(error.message);
                throw errMess;
            })
            .then(response=>response.json())
            .then(dishes => dispatch(addDishes(dishes)))
            .catch(error=> dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type: ActionsTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionsTypes.DISHES_FAILED,
    payload: errmess    
})

export const addDishes = (dishes) => ({
    type: ActionsTypes.ADD_DISHES,
    payload: dishes
});

export const fetchComments = () => dispatch => {

    return fetch(baseUrl+'comments')
            .then(response=>{
                if(response.ok){
                    return response;
                }
                else {
                    var error = new Error('Error '+response.status+': '+response.statusText);
                    error.response=response;
                    throw error;
                }
            },
            error=>{
                var errMess=new Error(error.message);
                throw errMess;
            })
            .then(response=>response.json())
            .then(comments => dispatch(addComments(comments)))
            .catch(error=> dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errmess) => ({
    type: ActionsTypes.COMMENTS_FAILED,
    payload: errmess    
})

export const addComments = (comments) => ({
    type: ActionsTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => dispatch => {
    dispatch(promosLoading(true));
    
    return fetch(baseUrl+'promotions')
            .then(response=>{
                if(response.ok){
                    return response;
                }
                else {
                    var error = new Error('Error '+response.status+': '+response.statusText);
                    error.response=response;
                    throw error;
                }
            },
            error=>{
                var errMess=new Error(error.message);
                throw errMess;
            })
            .then(response=>response.json())
            .then(promos => dispatch(addPromos(promos)))
            .catch(error=> dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionsTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionsTypes.PROMOS_FAILED,
    payload: errmess    
})

export const addPromos = (promos) => ({
    type: ActionsTypes.ADD_PROMOS,
    payload: promos
});

export const fetchLeaders = () => dispatch => {
    dispatch(leadersLoading(true));
    
    return fetch(baseUrl+'leaders')
            .then(response=>{
                if(response.ok){
                    return response;
                }
                else {
                    var error = new Error('Error '+response.status+': '+response.statusText);
                    error.response=response;
                    throw error;
                }
            },
            error=>{
                var errMess=new Error(error.message);
                throw errMess;
            })
            .then(response=>response.json())
            .then(leaders => dispatch(addLeaders(leaders)))
            .catch(error=> dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({
    type: ActionsTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionsTypes.LEADERS_FAILED,
    payload: errmess    
})

export const addLeaders = (leaders) => ({
    type: ActionsTypes.ADD_LEADERS,
    payload: leaders
});