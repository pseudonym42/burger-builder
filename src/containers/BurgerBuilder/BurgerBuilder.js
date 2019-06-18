import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import * as actionTypes from '../../store/actions';

import axios from '../../axios-orders';


class BurgerBuilder extends Component {

    state = {
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
        // axios.get('/ingredients.json')
        //     .then(response => {
        //         this.setState({
        //             ingredients: response.data
        //         });
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         this.setState({
        //             error: true
        //         });
        //     })
    }


    /************************************************
    Methods
    *************************************************/

    getPurchasableStatus(ingredients) {
        const sum = Object.values(ingredients).reduce((total, currentValue) => {
            return total + currentValue
        }, 0);
        return sum > 0;
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
        this.props.history.push('/checkout');
    }

    render () {

        const disabledInfo = {
            ...this.props.ings
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
        if (this.state.loading || !this.props.ings) {
            orderSummaryContent = <Spinner />;
        } else {
            orderSummaryContent = (
                <OrderSummary
                    ingredients={this.props.ings}
                    returnToBurgerBuilder={this.returnToBurgerBuilder}
                    buyBurger={this.buyBurger}
                    totalCost={this.props.totalCost}
                />
            );            
        }

        // set burger display and controls
        let burger = this.state.error ? <p>Error: Ingredients cannot be displayed!</p> : <Spinner />;
        if (this.props.ings) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ings}/>
                    <div>
                        <BuildControls
                            addIngredients={this.props.onIngredientAdded}
                            removeIngredients={this.props.onIngredientRemoved}
                            disabledInfo={disabledInfo}
                            totalCost={this.props.totalCost}
                            purchasable={this.getPurchasableStatus(this.props.ings)}
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


// convert redux store state into props for this component
const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        totalCost: state.totalCost
    };
};

// now convert functions into ptops for this component
const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingredientName) => dispatch({
            type: actionTypes.ADD_INGREDIENT,
            ingredientName: ingredientName
        }),
        onIngredientRemoved: (ingredientName) => dispatch({
            type: actionTypes.REMOVE_INGREDIENT,
            ingredientName: ingredientName
        })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder, axios));
