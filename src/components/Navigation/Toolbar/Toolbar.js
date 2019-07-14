import React from 'react';
import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../../Navigation/SideDrawer/DrawerToggle/DrawerToggle';


const toolbar = (props) => {
    return (
        <header className={styles.Toolbar}>
            <DrawerToggle clicked={props.drawerToggleClicked}/>
            {/*
                Note that this div wrapping Logo component is used
                purely to change the Logo size

                Also note that because we use css modules we can go
                and use the same class name like Logo, but re-define
                it and the names will never clash as suffixes are
                generated dynamically
            */}
            <div className={styles.Logo}>
                <Logo />
            </div>
            <nav className={styles.DesktopOnly}>
                <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>
        </header>
    )
}

export default toolbar;
