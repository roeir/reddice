import axios from 'axios';

export const userSignupRequest = (userData) => {
    return dispatch => {
        return axios.post('/api/users', userData);
    };
};

export const isUserExists = (ident) => {
    return dispatch => {
        return axios.get(`/api/users/${ident}`);
    };
};