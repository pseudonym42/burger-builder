import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';


const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3    
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalCost: 4,
        purchasable: false,
        orderSummaryVisible: false
    }

    updatePurchaseState(ingredients) {
        const sum = Object.values(ingredients).reduce((total, currentValue) => {
            return total + currentValue
        }, 0);

        this.setState({
            purchasable: sum > 0
        })
    }

    addIngredients = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const ingredientPrice = INGREDIENT_PRICES[type];
        const updatedTotalCost = this.state.totalCost + ingredientPrice;

        this.setState({
            ingredients: updatedIngredients,
            totalCost: updatedTotalCost
        })

        // because setState is async: we have to pass updatedIngredients to
        // the following updatePurchaseState function directly, otherwise in
        // updatePurchaseState we'd have to access the state directly which
        // will be stale at that moment as the above setState gets queued and
        // doe not run immidiately
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredients = (type) => {

        const oldCount = this.state.ingredients[type];

        if (oldCount > 0) {
            const updatedCount = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            }
            updatedIngredients[type] = updatedCount;
    
            const ingredientPrice = INGREDIENT_PRICES[type];
            const updatedTotalCost = this.state.totalCost - ingredientPrice;
            
            this.setState({
                ingredients: updatedIngredients,
                totalCost: updatedTotalCost
            })
            // because setState is async: we have to pass updatedIngredients to
            // the following updatePurchaseState function directly, otherwise in
            // updatePurchaseState we'd have to access the state directly which
            // will be stale at that moment as the above setState gets queued and
            // doe not run immidiately
            this.updatePurchaseState(updatedIngredients);
        }
    }

    displayOrderSummary = () => {
        this.setState({
            // orderSummaryVisible: !this.state.orderSummaryVisible
            orderSummaryVisible: true
        })
    }

    returnToBurgerBuilder = () => {
        this.setState({
            orderSummaryVisible: false
        })
    }

    buyBurger = () => {
        console.log('buying...');
    }

    render () {

        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let item in disabledInfo) {
            disabledInfo[item] = disabledInfo[item] <= 0;
        }

        return (
            <React.Fragment>
                <Modal 
                    show={this.state.orderSummaryVisible}
                    returnToBurgerBuilder={this.returnToBurgerBuilder}
                >
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        returnToBurgerBuilder={this.returnToBurgerBuilder}
                        buyBurger={this.buyBurger}
                        totalCost={this.state.totalCost}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <div>
                    <BuildControls
                        addIngredients={this.addIngredients}
                        removeIngredients={this.removeIngredients}
                        disabledInfo={disabledInfo}
                        totalCost={this.state.totalCost}
                        purchasable={this.state.purchasable}
                        displayOrderSummary={this.displayOrderSummary}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;