import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import * as actions from '../../store/actions/index';


class Checkout extends Component {

    cancelCheckout = () => {
        this.props.history.goBack();
    }

    confirmCheckout = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {

        let summary = <Redirect to='/' />;

        if (this.props.ings) {
            
            // this will redirect user to '/' page after purchase is complete
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null

            summary = (
                <React.Fragment>
                    {purchasedRedirect}
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
            );
        }

        return summary;
    }
}

// convert redux store state into props for this component
const mapStateToProps = (state) => {
    return {
        ings: state.bg.ingredients,
        purchased: state.order.purchased
    };
};


export default connect(mapStateToProps)(Checkout);
