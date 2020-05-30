import * as ActionsTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';

export const addComment =  (dishId, rating, author, comment) =>({
    type: ActionsTypes.ADD_COMMENT,
    payload: {
        dishId,
        rating,
        author,
        comment
    }
});

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