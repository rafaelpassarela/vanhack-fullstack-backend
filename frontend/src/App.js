import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/App.css';
import 'isomorphic-fetch';
import MarkdownEditor from './components/markdown.editor.view';
import NavbarMain from './components/navbar.main';
import TestApiClass from './components/test.api.component';

class App extends Component {

    //constructor(props) {
    //    super(props);
    //}

    render() {
        return (
            <div className="App">
                <NavbarMain />
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                
                <MarkdownEditor text="# Test by prop" />

                <TestApiClass autoLoad={false}/>               
            </div>
        );
    }
}

export default App;
