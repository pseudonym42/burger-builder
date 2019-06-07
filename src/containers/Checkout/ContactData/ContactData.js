import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';


class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });

        /*
            Note that in real world app you would not submit the price
            from client but rather calculate the price on the server
            so user cannot manipulate it
        */
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.cost,
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
                    loading: false
                });
                this.props.history.push('/');
            })
            .catch(error => {
                console.log("ERROR: could not place the order!")
                this.setState({
                    loading: false
                });
            })
    }

    render() {

        let orderForm = (
            <form>
                <input className={styles.Input} type="text" name="name" placeholder="Your name" />
                <input className={styles.Input} type="email" name="email" placeholder="Your email" />
                <input className={styles.Input} type="text" name="street" placeholder="Street" />
                <input className={styles.Input} type="text" name="postal" placeholder="Postal Code" />
                <Button buttonType="Success" action={this.orderHandler}>BUY</Button>
            </form>
        );

        if (this.state.loading) {
            orderForm = <Spinner />;
        }

        return (
            <div className={styles.ContactData}>
                <h1>Enter your contact data below</h1>
                {orderForm}
            </div>
        )
    }

}

export default ContactData;