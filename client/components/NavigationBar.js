import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationBar = () => {
    return (
        <nav className="navbar navbar-default navbar-static-top">
            <div className="container-fluid">
                <div className="navbar-header">
                    <NavLink to="/" className="navbar-brand">Red Dice</NavLink>
                </div>

                <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <NavLink to="/signup">Signup</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;