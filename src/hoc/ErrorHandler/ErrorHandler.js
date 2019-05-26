import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';

/*
    This is an example of HOC used as a class factory,
    note that the classes are anonymous
    
    It wrapps a component and provides access to a modal,
    which can be used to display errors.
    
    Note the usage of axios below to process requests and
    responses. Here we use axios as a middleware basically
*/
const errorHandler = (WrappedComponent, axios) => {
    return (
        class extends Component {
            
            state = {
                error: null
            }

            componentDidMount() {
                /*
                    Axios interceptors (Middleware) to process requests

                    Note that .use() method one argument which needs
                    to be a function to process a request
                */
                axios.interceptors.request.use(request => {
                    // set error to null whenever new request is sent
                    this.setState({
                        error: null
                    });
                    return request;
                });
                /*
                    Axios interceptors (Middleware) to process responses

                    Note that .use() method takes two arguments,
                    both arguments must be functions, the first one
                    is to process response and the second one to process
                    an error. We are not interested in processing response
                    here so we just pass it through, but we'll process
                    the errors

                */
                axios.interceptors.response.use(response => response, error => {
                    // note that below the error we assign to error
                    // key in the state is an object, which contains
                    // all the data about the error
                    this.setState({
                        error: error
                    });
                });

            }

            removeErrorMessage = () => {
                this.setState({
                    error: null
                });
            }

            render () {
                /*
                    note that if error is not null it will be
                    an object which has .message attribute which
                    we can use to display the error message
                */
                let errorMessage = null;
                if (this.state.error) {
                    errorMessage = this.state.error.message;
                }

                return (
                    <React.Fragment>
                            <Modal
                                show={this.state.error}
                                onClickFunction={this.removeErrorMessage}
                            >
                                {errorMessage}
                            </Modal>
                        <WrappedComponent {...this.props}/>
                    </React.Fragment>
                );
            }
        }
    );
};

export default errorHandler;