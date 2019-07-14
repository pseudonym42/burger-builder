import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import * as actions from '../../store/actions/index';

import axios from '../../axios-orders';


// export is added here to allow unit testing of the component
export class BurgerBuilder extends Component {

    state = {
        orderSummaryVisible: false
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    getPurchasableStatus(ingredients) {
        const sum = Object.values(ingredients).reduce((total, currentValue) => {
            return total + currentValue
        }, 0);
        return sum > 0;
    }

    displayOrderSummary = () => {
        if (this.props.isAuthenticated) {
            this.setState({
                orderSummaryVisible: true
            })
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    returnToBurgerBuilder = () => {
        this.setState({
            orderSummaryVisible: false
        })
    }

    buyBurger = () => {
        this.props.onInitPurchase();
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
        if (!this.props.ings) {
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
        let burger = this.props.error ? <p>Error: Ingredients cannot be displayed!</p> : <Spinner />;
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
                            isAuth={this.props.isAuthenticated}
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
        ings: state.bg.ingredients,
        totalCost: state.bg.totalCost,
        error: state.bg.error,
        isAuthenticated: state.auth.token !== null
    };
};

/* 
    now convert functions into props for this component i.e.
    this component wil have a prop e.g. <onIngredientAdded>
    which could be used as <this.props.onIngredientAdded> to 
    trigger the below corresponding function
*/
const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(
            actions.addIngredient(ingredientName)
        ),
        onIngredientRemoved: (ingredientName) => dispatch(
            actions.removeIngredient(ingredientName)
        ),
        onInitIngredients: () => dispatch(
            actions.initIngredients()
        ),
        onInitPurchase: () => dispatch(
            actions.purchaseInit()
        ),
        onSetAuthRedirectPath: (path) => dispatch(
            actions.setAuthRedirectPath(path)
        )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder, axios));
