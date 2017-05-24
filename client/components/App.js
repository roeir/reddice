import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Home from './Home';
import Signup from './signup/SignupPage';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <NavigationBar />
                    <Route exact path="/" component={ Home } />
                    <Route path="/signup" component={ Signup } />
                </div>
            </Router>
        );
    }
}

export default App;
