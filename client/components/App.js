import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import NavigationBar from './NavigationBar';
import Home from './Home';
import Signup from './signup/SignupPage';

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

class App extends Component {
    render() {
        return (
            <Provider store={ store }>
                <Router>
                    <div className="container">
                        <NavigationBar />
                        <Route exact path="/" component={ Home } />
                        <Route path="/signup" component={ Signup } />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
