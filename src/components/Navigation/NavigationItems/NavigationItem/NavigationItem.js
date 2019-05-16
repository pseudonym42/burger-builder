import React from 'react';
import styles from './NavigationItem.module.css';


const navigationItem = (props) => {

    const activeLinkStyling = props.active ? styles.active : null;

    return (
        <li className={styles.NavigationItem}>
            <a href={props.link} className={activeLinkStyling}>
                {props.children}
            </a>
        </li>
    )
}

export default navigationItem;
