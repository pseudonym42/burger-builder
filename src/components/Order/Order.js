import React from 'react';
import styles from './Order.module.css';


const order = (props) => {

    return (
        <div className={styles.Order}>
            <p>
                Ingredients: ...
            </p>
            <p>
                Cost: <strong>7.80</strong> GBP
            </p>
        </div>
    )
}

export default order;