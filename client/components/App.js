import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import NavigationBar from './NavigationBar';
import Home from './Home';
import Signup from './signup/SignupPage';
import Login from './login/LoginPage';
import NewEventPage from './events/NewEventPage';
import FlashMessagesList from './flash/FlashMessagesList';
import {setCurrentUser} from '../actions/authActions';
import setAuthToken from '../utils/authToken';
import decodeToken from 'jsonwebtoken/decode';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

if (module.hot) {
  module.hot.accept('../reducers', () => {
    const nextRootReducer = require('../reducers/index');
    store.replaceReducer(nextRootReducer);
  });
}

if (localStorage['loginToken']) {
  const token = localStorage.getItem('loginToken');
  setAuthToken(token);
  store.dispatch(setCurrentUser(decodeToken(token)));
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="container">
            <NavigationBar />
            <FlashMessagesList />
            <Route exact path="/" component={ Home }/>
            <Route path="/signup" component={ Signup }/>
            <Route path="/login" component={ Login }/>
            <Route path="/new-event" component={ NewEventPage } />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
