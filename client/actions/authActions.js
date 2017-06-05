import axios from 'axios';
import decodeToken from 'jwt-decode';
import setAuthToken from '../utils/authToken';
import { SET_CURRENT_USER } from './types';

export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        user
    };
};

export const login = (userData) => {
    return dispatch => {
        return axios.post('/api/auth', userData)
            .then(({ data }) => {
                const token = data.token;
                localStorage.setItem('loginToken', token);
                setAuthToken(token);
                dispatch(setCurrentUser(decodeToken(token)));
            });
    };
};

export const logout = () => {
  return dispatch => {
    localStorage.removeItem('loginToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
  }
};