import reducer from './authReducer';
import * as actionTypes from '../actions/actionTypes';


describe('Testing authReducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    });

    it('should store the token upon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'            
        }, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'someToken',
            userId: 'someUser'
        })).toEqual({
            token: 'someToken',
            userId: 'someUser',
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    });    
});
