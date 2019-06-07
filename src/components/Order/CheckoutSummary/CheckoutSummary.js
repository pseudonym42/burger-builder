import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from './CheckoutSummary.module.css';


const checkoutSummary = (props) => {
    return (
        <div className={styles.CheckoutSummary}>
            <h1>Proceed to checkout?</h1>
            <div style={{
                width: '100%',
                margin: 'auto'
            }}>
                <Burger ingredients={props.ingredients}/>
                <Button buttonType="Danger" action={props.cancelCheckout}>CANCEL</Button>
                <Button buttonType="Success" action={props.confirmCheckout}>CHECKOUT</Button>
            </div>
        </div>
    )
}

export default checkoutSummary;