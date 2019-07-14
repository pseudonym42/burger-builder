import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import styles from './Auth.module.css';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';


class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    isRequired: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    isRequired: true,
                    minLength: 5
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    }

    componentDidMount() {

        /*
            if user is trying to authenticate when not building
            a burger then we need to reset redirection path to 
            default root path i.e. '/' before authentication is
            handled. This is to prevent cases where we might end
            up redirecting user to '/checkout' when user is not
            building a burger
        */
        if (!this.props.buildingBurger && this.props.authRedirect !== '/') {
            this.props.resetAuthRedirectPath();
        }
    }

    // validates fields, here rules is the value of
    // 'validation' key from the state
    checkValidity(value, rules) {
        let isFieldValid = true;

        // note that we have additional check everywhere which is
        // "isFieldValid &&", this allows us to put the validations
        // in sequence

        if (rules.isRequired) {
            isFieldValid = isFieldValid && value.trim() !== '';
        }

        if (rules.minLength) {
            isFieldValid = isFieldValid && value.length > rules.minLength;
        }

        if (rules.isEmail) {
            const pattern = /\S+@\S+\.\S+/;
            isFieldValid = isFieldValid && pattern.test(value);
        } 

        return isFieldValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(
                    event.target.value,
                    this.state.controls[controlName].validation
                ),
                touched: true
            }
        }
        this.setState({
            controls: updatedControls
        });
    }

    submitHandler = (event) => {
        event.preventDefault(); // to prevent page reload

        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignup
        )
    }

    switchAuthMode = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            }
        });
    }

    render() {

        // generate form fields
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => {
            return (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    defaultValue={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                />
            );
        })

        const authMode = this.state.isSignup ? "Already registered?" : "Register",
              authButtonTitle = this.state.isSignup ? "Sign Up" : "Log In";

        if (this.props.loading) {
            form = <Spinner />;
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>
                    {this.props.error.message}
                </p>
            );
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirect} />
        }

        return (
            <div className={styles.Auth}>
                { authRedirect }
                { errorMessage }
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button buttonType="Success">
                        { authButtonTitle }
                    </Button>
                </form>
                <Button buttonType="Danger" action={this.switchAuthMode}>
                    { authMode }
                </Button>
            </div>
        );
    }
}


// convert redux store state into props for this component
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.bg.building,
        authRedirect: state.auth.authRedirectPath
    };
};


/* 
    now convert functions into props for this component i.e.
    this component wil have a prop e.g. <onAuth> which could
    be used as <this.props.onAuth> to  trigger the below
    corresponding function
*/
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(
            actions.auth(email, password, isSignup)
        ),
        resetAuthRedirectPath: () => dispatch(
            actions.setAuthRedirectPath("/")
        )
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Auth);
