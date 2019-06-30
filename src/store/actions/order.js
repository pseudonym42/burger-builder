import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


/* 
    Refer to burgerBuilder.js (which contains
    burger builder related action types) for 
    more details re why action types are required
*/

/*
    sync action type creators
*/

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

/* 
    async action type creators
*/
export const purchaseBurger = (orderData) => {
    return dispatch => {
        /*
            we are using Firebase, so we did not create an API endpoint
            to handle our requests. But they will get created magically,
            for this to work we need to specify a namespace where all
            key-value pairs will be created like this:
                
                /<namespace>.json

            Note that below path will be appended to the baseURL to send
            the post request
        */
        dispatch(purchaseBurgerStart());
        axios.post("/orders.json", orderData)
            .then(response => {
                console.log("Order placed!");
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                console.log("ERROR: could not place the order!")
                dispatch(purchaseBurgerFail(error));
            })

    };
}