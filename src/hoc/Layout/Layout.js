import React, { Component } from 'react';
import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    }

    sideDrawerToggler = () => {
        /*
            Due to async nature of setState, we do not toggle showSideDrawer
            directly like: !this.state.showSideDrawer, we instead grab the 
            previous state and do the toggle on showSideDrawer from previous
            state
        */
        this.setState((prevState) => {
            return ({
                showSideDrawer: !prevState.showSideDrawer
            })
        });
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <Toolbar 
                        drawerToggleClicked={this.sideDrawerToggler}
                    />
                    <SideDrawer
                        show={this.state.showSideDrawer}
                        sideDrawerClosedHandler={this.sideDrawerClosedHandler}
                    />
                </div>
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
}

export default Layout;