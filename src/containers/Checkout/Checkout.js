import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';


class Checkout extends Component {

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
                    ingredients={this.props.ings}
                    cancelCheckout={this.cancelCheckout}
                    confirmCheckout={this.confirmCheckout}
                />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData}
                />
            </React.Fragment>
        )
    }
}

// convert redux store state into props for this component
const mapStateToProps = (state) => {
    return {
        ings: state.ingredients
    };
};

export default connect(mapStateToProps)(Checkout);
