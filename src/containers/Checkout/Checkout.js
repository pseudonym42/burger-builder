import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';


class Checkout extends Component {

    state = {
        ingredients: null,
        cost: 0
    }

    componentWillMount() {
        const queryParams = new URLSearchParams(this.props.location.search),
              ingredients = {};
        let cost = 0;

        for (let [param, value] of queryParams.entries()) {
            // totalCost is also passed as query param so extract it
            // and convert it to a float number
            if (param === 'totalCost') {
                cost = parseFloat(parseFloat(value).toFixed(2));
            } else {
                ingredients[param] = parseInt(value);
            }
        }
        
        this.setState({
            ingredients: ingredients,
            cost: cost
        });
    }

    cancelCheckout = () => {
        this.props.history.goBack();
    }

    confirmCheckout = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <React.Fragment>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    cancelCheckout={this.cancelCheckout}
                    confirmCheckout={this.confirmCheckout}
                />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => (
                        <ContactData
                            ingredients={this.state.ingredients}
                            cost={this.state.cost}
                            /*
                                pass all other props as well so we could use 
                                that data to redirect user when order is placed
                            */
                            {...props}
                        />
                    )}
                />
            </React.Fragment>
        )
    }
}

export default Checkout;