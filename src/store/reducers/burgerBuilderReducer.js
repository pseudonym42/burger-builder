import * as actionTypes from '../actions/actionTypes';


const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3    
}


const initialState = {
    ingredients: null,
    totalCost: 4,
    error: false
};

const reducer = (state=initialState, action) => {
    /*
        Note that this reducer re-calculates burger price each
        time a new ingredient is added or removed
    */
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            let postAddCost = state.totalCost + INGREDIENT_PRICES[action.ingredientName];
            postAddCost = parseFloat(postAddCost.toFixed(2));
            return  {
                ...state,
                /* 
                    we have to spread nested objects as well as by
                    default spread os state (i.e. <...state>) does
                    only shallow copying
                */
                ingredients: {
                    ...state.ingredients,
                    // now override existing value with new one:
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalCost: postAddCost
            }
        case actionTypes.REMOVE_INGREDIENT:
            let postRemoveCost = state.totalCost - INGREDIENT_PRICES[action.ingredientName];
            postRemoveCost = parseFloat(postRemoveCost.toFixed(2));
            return {
                ...state,
                /* 
                    we have to spread nested objects as well as by
                    default spread os state (i.e. <...state>) does
                    only shallow copying
                */
                ingredients: {
                    ...state.ingredients,
                    // now override existing value with new one:
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalCost: postRemoveCost
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalCost: 4
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
};

export default reducer;