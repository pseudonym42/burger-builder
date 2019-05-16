import React from 'react';
import styles from './BuildControl.module.css';


const buildControl = (props) => {
    return (
        <div className={styles.BuildControl}>
            <div className={styles.Label}>
                {props.label}
            </div>
            <button
                className={styles.Less}
                onClick={props.removeIngredients}
                disabled={props.disabledInfo}
            >
                Less
            </button>
            <button
                className={styles.More}
                onClick={props.addIngredients}
            >
                More
            </button>
        </div>
    );
}

export default buildControl;
