import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


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

const _processAddIngredient = (state, action) => {
    let postAddCost = state.totalCost + INGREDIENT_PRICES[action.ingredientName];
    postAddCost = parseFloat(postAddCost.toFixed(2));

    const postAddIngredients = updateObject(
        state.ingredients,
        {
            [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        }
    );

    const postAddState = {
        ingredients: postAddIngredients,
        totalCost: postAddCost
    }

    return updateObject(state, postAddState);
}

const _processRemoveIngredient = (state, action) => {
    let postRemoveCost = state.totalCost - INGREDIENT_PRICES[action.ingredientName];
    postRemoveCost = parseFloat(postRemoveCost.toFixed(2));

    const postRemoveIngredients = updateObject(
        state.ingredients,
        {
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        }
    );

    const postRemoveState = {
        ingredients: postRemoveIngredients,
        totalCost: postRemoveCost
    }

    return  updateObject(state, postRemoveState);
}

const reducer = (state=initialState, action) => {
    /*
        Note that this reducer re-calculates burger price each
        time a new ingredient is added or removed
    */
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return _processAddIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return _processRemoveIngredient(state, action);
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