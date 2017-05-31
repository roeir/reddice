import axios from 'axios';

export const login = (userData) => {
    return dispatch => {
        return axios.post('/api/auth', userData);
    };
};