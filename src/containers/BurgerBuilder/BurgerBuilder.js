import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-orders';


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
        orderSummaryVisible: false,
        loading: false
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

        this.setState({
            loading: true
        });

        /*
            Note that in real world app you would not submit the price
            from client but rather calculate the price on the server
            so user cannot manipulate it
        */
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalCost,
            customer: {
                name: "Jack Doe",
                address: {
                    country: "Roman Empire",
                    zipCode: "41351"
                },
                email: "jack.doe@test.com"
            },
            deliveryOption: 'express'
        }

        /*
            we are using Firebase, so we did not create an API endpoint
            to handle our requests. But they will get created magically,
            for this to work we need to specify a namespace where all
            key-value pairs will be created like this:
                
                /<namespace>.json

            Note that below path will be appended to the baseURL to send
            the post request
        */
        axios.post("/orders.json", order)
            .then(response => {
                console.log("Order placed!");
                this.setState({
                    loading: false,
                    orderSummaryVisible: false
                });
            })
            .catch(error => {
                console.log("ERROR: could not place the order!")
                this.setState({
                    loading: false,
                    orderSummaryVisible: false
                });
            })
    }

    render () {

        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let item in disabledInfo) {
            disabledInfo[item] = disabledInfo[item] <= 0;
        }

        let orderSummaryContent = (
            <OrderSummary
                ingredients={this.state.ingredients}
                returnToBurgerBuilder={this.returnToBurgerBuilder}
                buyBurger={this.buyBurger}
                totalCost={this.state.totalCost}
            />            
        )
        if (this.state.loading) {
            orderSummaryContent = <Spinner />;
        }

        return (
            <React.Fragment>
                <Modal 
                    show={this.state.orderSummaryVisible}
                    returnToBurgerBuilder={this.returnToBurgerBuilder}
                >
                    {orderSummaryContent}
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