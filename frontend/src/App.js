import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/App.css';
import 'isomorphic-fetch';

import HomeHeader from './components/home.header.view';
import NavbarMain from './components/navbar.main';
import RouterHolder from './components/router.place.holder'
import MarkdownEditor from './components/markdown.editor.view';

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
                    
                    <div className="din-content">
                        <RouterHolder />
                        <MarkdownEditor text="# Test by prop" />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
