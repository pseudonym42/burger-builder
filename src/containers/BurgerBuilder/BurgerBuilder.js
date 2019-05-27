import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';

import axios from '../../axios-orders';


const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3    
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalCost: 4,
        purchasable: false,
        orderSummaryVisible: false,
        // true when order is POSTed and being processed
        loading: false,
        /*
            this is additional error flag in addition to ErrorHandler
            status, which covers componentDidMount related scenario when
            error happens while fetching ingredients
        */
        error: false
    }

    /************************************************
    Life Cycle Hooks
    *************************************************/

    componentDidMount() {
        /*
            Note that if you'd like to test the catch error functionality
            you might change URL to '/ingredients' this will reject the 
            promise thus triggering the .catch section of the code

            However, the Firebase backend will still return 200 OK response
            if you change URL to '/random.json', keep this mind. This behaviour
            of Firebase (this might be an issue with axios though?) have not been
            taken into account here
        */
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({
                    ingredients: response.data
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    error: true
                });
            })
    }


    /************************************************
    Methods
    *************************************************/

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

        /* 
            set order summary content, note that the order summary content
            is set to a Spinner if:

                1) On initial page load the ingredients is null, so until
                   they are fetched the Spinner got to be displayed
                2) When user submitted the order via POST request so we
                   need to display the Spinner
        */
        let orderSummaryContent;
        if (this.state.loading || !this.state.ingredients) {
            orderSummaryContent = <Spinner />;
        } else {
            orderSummaryContent = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    returnToBurgerBuilder={this.returnToBurgerBuilder}
                    buyBurger={this.buyBurger}
                    totalCost={this.state.totalCost}
                />
            );            
        }

        // set burger display and controls
        let burger = this.state.error ? <p>Error: Ingredients cannot be displayed!</p> : <Spinner />;
        if (this.state.ingredients) {
            burger = (
                <React.Fragment>
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

        return (
            <React.Fragment>
                <Modal 
                    show={this.state.orderSummaryVisible}
                    onClickFunction={this.returnToBurgerBuilder}
                >
                    {orderSummaryContent}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

export default ErrorHandler(BurgerBuilder, axios);