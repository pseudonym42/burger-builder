import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from './CheckoutSummary.module.css';


const checkoutSummary = (props) => {
    return (
        <div className={styles.CheckoutSummary}>
            <h1>Enjoy!</h1>
            <div style={{
                width: '100%',
                margin: 'auto'
            }}>
                <Burger ingredients={props.ingredients}/>
                <Button buttonType="Danger" action>CANCEL</Button>
                <Button buttonType="Success" action>CONFIRM</Button>
            </div>
        </div>
    )
}

export default checkoutSummary;