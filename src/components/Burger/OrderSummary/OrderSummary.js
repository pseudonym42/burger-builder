import React from 'react';
import Button from '../../UI/Button/Button';


const orderSummary = (props) => {

    const summary = Object.entries(props.ingredients).map((item) => {
        return (
            <li key={item[0]}>
                <span style={{textTransform: 'capitalize'}}>{item[0]}</span>: {item[1]}
            </li>
        );
    })

    return (
        <React.Fragment>
            <h3>Your order summary</h3>
            <p>Delicious burger with the following ingredients:</p>
            <ul>
                {summary}
            </ul>
            <p>Total cost: <strong>{props.totalCost.toFixed(2)}</strong> GBP</p>

            <Button 
                buttonType="Success"
                action={props.buyBurger}
            >
                PREVIEW ORDER
            </Button>
            <Button 
                buttonType="Danger"
                action={props.returnToBurgerBuilder}
            >
                CANCEL
            </Button>
        </React.Fragment>
    )
}

export default orderSummary;
