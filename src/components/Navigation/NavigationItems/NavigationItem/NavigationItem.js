import React from 'react';
import styles from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';


const navigationItem = (props) => {
    return (
        <li className={styles.NavigationItem}>

            <NavLink
                to={props.link}
                /*
                    below line is required to set the active class,
                    this sets the active class to something like
                    "NavigationItem_active__wdKFA", otherwise it will
                    simply be "active" and has no desired effect
                 */
                activeClassName={styles.active}
                /*
                    below line helps to display only the current active link
                    otherwise as, for example, route '/' is part of
                    '/orders' then both links will be rendered as active
                 */
                exact
            >
                {props.children}
            </NavLink>
        </li>
    )
}

export default navigationItem;
