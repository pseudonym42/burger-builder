import * as actionTypes from './actions';


const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3    
}


const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0 
    },
    totalCost: 4
};

const reducer = (state=initialState, action) => {
    /*
        Note that this reducer re-calculates burger price each
        time a new ingredient is added or removed
    */
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
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
                totalCost: state.totalCost + INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
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
                totalCost: state.totalCost - INGREDIENT_PRICES[action.ingredientName]
            }
        default:
            return state;
    }
};

export default reducer;