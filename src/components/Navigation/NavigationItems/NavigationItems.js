import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props) => {
    return (
        <ul className={styles.NavigationItems}>

            <NavigationItem
                link="/auth"
            >
                Authenticate
            </NavigationItem>

            <NavigationItem
                link="/"
            >
                Burger Builder
            </NavigationItem>

            <NavigationItem
                link="/orders"
            >
                My Orders
            </NavigationItem>

        </ul>
    )
}

export default navigationItems;
