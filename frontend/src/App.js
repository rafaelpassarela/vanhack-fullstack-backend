import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import cookie from 'react-cookies';

import './styles/App.css';
import 'isomorphic-fetch';

import HomeHeader from './components/home.header.view';
import NavbarMain from './components/navbar.main';
import RouterHolder from './components/router.place.holder'


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            token: undefined
        };

        this.loadToken = this.loadToken.bind(this);
    }

    loadToken() {
        //cookie.save('teste', 'tes value');
        const tokenCookie = cookie.load('userId'); // cookie.load('.AspNetCore.Identity.Application');

        this.setState({ token: tokenCookie });
    }

    render() {

        const myToken = this.state.token;

        return (
            <Router>
                <div className="App">
                    <NavbarMain />
                    <HomeHeader />
                    <div className="din-content">
                        <RouterHolder />
                    </div>
                    <button onClick={this.loadToken}>Load Token</button>
                    Token: {myToken}
                </div>
            </Router>
        );
    }
}

export default App;
