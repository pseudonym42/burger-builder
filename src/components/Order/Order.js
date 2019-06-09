import React from 'react';
import styles from './Order.module.css';


const order = (props) => {

    // convert ingredients object
    let ingredients = [];
    for (let ingr in props.ingredients) {
        ingredients.push({
            name: ingr,
            amount: props.ingredients[ingr]
        })
    }

    const ingredientsOutput = ingredients.map((ingredient) => {
        return (
            <span 
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px'
                }}
                key={ingredient.name}>
                {ingredient.name} ({ingredient.amount})
            </span>
        )
    })

    return (
        <div className={styles.Order}>
            <p>
                Ingredients: {ingredientsOutput}
            </p>
            <p>
                Cost: <strong>{props.price}</strong> GBP
            </p>
        </div>
    )
}

export default order;