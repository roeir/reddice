import { combineReducers } from 'redux';
import flashMessages from './flashMessages';
import auth from './auth';

const rootReducer = combineReducers({
    flashMessages,
    auth
});

export default rootReducer;