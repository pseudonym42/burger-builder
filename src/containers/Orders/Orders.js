import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';


class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then((response) => {

                const fetchedOrders = [];
                for (let order_key in response.data) {
                    fetchedOrders.push({
                        ...response.data[order_key],
                        id: order_key
                    });
                }

                this.setState({
                    loading: false,
                    orders: fetchedOrders
                })
            })
            .catch(error => {
                this.setState({
                    loading: false
                })
            })
    }       

    render() {

        let userOrders = <p style={{padding: "50px"}}>You have not made any orders yet</p>;
        if (this.state.orders.length !== 0) {
            userOrders = (
                this.state.orders.map(order => {
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

        return (
            <React.Fragment>
                { userOrders }
            </React.Fragment>
        )
    }
}

export default ErrorHandler(Orders, axios);