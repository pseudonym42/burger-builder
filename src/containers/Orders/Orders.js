import React, {Component} from 'react';
import { connect } from 'react-redux';


import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';


class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders();
    }       

    render() {

        let userOrders = <Spinner />;
        if (!this.props.loding) {
            userOrders = <p style={{padding: "50px"}}>You have not made any orders yet</p>;
            if (this.props.orders.length !== 0) {
                userOrders = (
                    this.props.orders.map(order => {
                        return (
                            <Order
                                key={order.id} 
                                ingredients={order.ingredients}
                                price={order.price}
                            />
                        )
                    })
                );
            }
        }

        return (
            <React.Fragment>
                { userOrders }
            </React.Fragment>
        )
    }
}

// convert redux store state into props for this component
const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    };
};

/* 
    now convert functions into props for this component i.e.
    this component wil have a prop e.g. <onFetchOrders>
    which could be used as <this.props.onFetchOrders> to 
    trigger the below corresponding function
*/
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: () => dispatch(
            actions.fetchOrders()
        )       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(Orders, axios));
