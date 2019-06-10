import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';


class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street'
                },
                value: ''
            },
            postcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your postcode'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: ''
            },
            deliveryOption: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'express', displayValue: 'Express'},
                        {value: 'standard', displayValue: 'Standard'}
                    ]
                },
                value: ''
            }
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
            price: this.props.cost
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

    // inputIdentifier below will refer to postcode, email, street etc
    inputChangedHandler = (event, inputIdentifier) => {
        // note that spread operator does only shallow copy
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        // b'cos above copy is shallow and we need somehow get to value
        // property of input field in the state object - we need to
        // copy the specific input field data into another variable,
        // change its value and then update updatedOrderForm accordingly
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        // now we can update the state
        this.setState({
            orderForm: updatedOrderForm
        });

    }

    render() {

        // generate form fields
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let orderForm = (
            <form>
                {
                    formElementsArray.map((formElement) => {
                        return (
                            <Input
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                defaultValue={formElement.config.value}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                            />
                        );
                    })
                }
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