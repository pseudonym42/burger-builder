import React from 'react';
import styles from './Logo.module.css';
import burgerLogPath from '../../assets/images/burger-logo.png'


const logo = (props) => {
    return (
        <div className={styles.Logo}>
            <img src={burgerLogPath} alt="Burger"   />
        </div>
    )
}

export default logo;