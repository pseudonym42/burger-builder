import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl'


const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
]

const buildControls = (props) => {
    return(
        <div className={styles.BuildControls}>
            <p>Total Cost: <strong>{props.totalCost.toFixed(2)}</strong> GBP</p>
            {
                controls.map((control) => {
                    return (
                        <BuildControl
                            key={control.label}
                            label={control.label}
                            addIngredients={() => props.addIngredients(control.type)}
                            removeIngredients={() => props.removeIngredients(control.type)}
                            disabledInfo={props.disabledInfo[control.type]}
                        />
                    );
                })
            }
            <button 
                className={styles.OrderButton}
                disabled={!props.purchasable}
                onClick={props.displayOrderSummary}
            >
                ORDER NOW
            </button>
        </div>
    );
}

export default buildControls;
