import React, {Component} from 'react';
import styles from './Auth.module.css';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';



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
                    minLength: 8
                },
                valid: false,
                touched: false
            }
        },
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

    render() {

        // generate form fields
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const form = formElementsArray.map(formElement => {
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

        return (
            <div className={styles.Auth}>
                <form>
                    {form}
                    <Button buttonType="Success">
                        SUBMIT
                    </Button>
                </form>
            </div>
        );
    }
}

export default Auth;
