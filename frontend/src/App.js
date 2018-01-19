import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import './styles/App.css';
import 'isomorphic-fetch';

import HomeHeader from './components/home.header.view';
import NavbarMain from './components/navbar.main';

import MarkdownEditor from './components/markdown.editor.view';
import TestApiClass from './components/test.api.component';

class App extends Component {

    //constructor(props) {
    //    super(props);
    //}

    render() {
        return (
            <Router>
                <div className="App">
                    <NavbarMain />
                    <HomeHeader />
                    <Link to="/test">Api Test</Link>
                    <Link to="/">Home</Link>
                    <MarkdownEditor text="# Test by prop" />

                    <Route exact path="/" render={() => (
                        <h1>You're at Home</h1>
                    )} />
                    <Route path="/test" component={TestApiClass} />

                    <TestApiClass autoLoad={false} />
                </div>
            </Router>
        );
    }
}

export default App;
