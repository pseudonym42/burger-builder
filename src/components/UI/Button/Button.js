import React from 'react';
import styles from './Button.module.css';


const button = (props) => (
    <button
        className={`${styles.Button} ${styles[props.buttonType]}`}
        onClick={props.action}
    >
        {props.children}
    </button>
);


export default button;
