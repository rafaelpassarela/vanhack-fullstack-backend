import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './styles/App.css';
import 'isomorphic-fetch';

import HomeHeader from './components/home.header.view';
import NavbarMain from './components/navbar.main';
import RouterHolder from './components/router.place.holder'


class App extends Component {

    render() {
        return (
            <Router>
                <div className="App">
                    <NavbarMain />
                    <HomeHeader />
                    <div className="din-content">
                        <RouterHolder />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
