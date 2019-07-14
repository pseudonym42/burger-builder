import React from 'react';
import styles from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';


const sideDrawer = (props) => {

    let attachedClasses = [styles.SideDrawer, ],
        showBackdrop = false;
    
    // if sideDrawer to be displayed then display the Backdrop as well
    // and update the css
    if (props.show) {
        showBackdrop = true;
        attachedClasses.push(styles.Open);
    }
    // else leave showBackdrop as false and update the css 
    else {
        attachedClasses.push(styles.Close);
    }

    return (
        <React.Fragment>
            {/* Note that passing <show> with no value sets it to true */}
            <Backdrop show={showBackdrop} onClickFunction={props.sideDrawerClosedHandler} />

            {/*
                below onClick is to hide the SideDrawer whenever it is clicked or
                any link within SideDrawer is clicked
            */}
            <div className={attachedClasses.join(' ')} onClick={props.sideDrawerClosedHandler}>
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
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </React.Fragment>
    )
}

export default sideDrawer;
