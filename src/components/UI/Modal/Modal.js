import React, { Component } from 'react';
import styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {
    
    // we update component only when it is displayed, i.e.
    // if the modal is not being displayed there's no need
    // to update it
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }

    render() {
        return (
            <React.Fragment>
                <Backdrop show={this.props.show} onClickFunction={this.props.returnToBurgerBuilder}/>
                <div
                    className={styles.Modal}
                    style={{
                        // let's use the animation which we created in Modal.module.css
                        // vh stands for view point height
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                
                >
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
}

export default Modal;
