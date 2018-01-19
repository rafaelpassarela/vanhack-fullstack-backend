import React, { Component } from 'react';
//import { RouteComponentProps } from 'react-router';
import logo from './logo.svg';
import './styles/App.css';
import 'isomorphic-fetch';
import Button from 'react-bootstrap/lib/Button';
import Badge from 'react-bootstrap/lib/Badge';
import MarkdownEditor from './components/markdown.editor.view';
import NavbarMain from './components/navbar.main';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            values: undefined,
            loading: false
        };

        this.setLoading = this.setLoading.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
    }

    setLoading(value) {
        this.setState({ loading: value });
    }

    getValueList(values) {
        if (values === undefined)
            return "None";
        else {
            const items = values.map(function (val, i) {
                return <span key={i}>&hearts; {i} - {val} <br/> </span>;
            });
            return items;
        }
    }

    clickHandler() {
        this.setLoading(true);

        //fetch("http://localhost:54163/api/values", {
        //    method: 'GET',
        //    headers: {
        //        Accept: 'application/json',
        //        'Content-Type': 'application/json',
        //        'Access-Control-Allow-Origin': '*'
        //    },
        //    body: JSON.stringify({
        //        firstParam: 'yourValue',
        //        secondParam: 'yourOtherValue',
        //    }),
        //})
        fetch("http://localhost:54163/api/values")
            .then(res => res.json())
            .then(
            (result) => {
                this.setState({
                    error: undefined,
                    loading: false,
                    values: result
                });
            },
            (error) => {
                this.setState({
                    loading: false,
                    error
                });
            }
            );
    }

    render() {
        const { error, loading, values } = this.state;

        let contents;

        if (error) {
            contents = <font color='red'>{error.message}<br />{error.stack}</font>;
        } else {
            contents = loading
                ? <em>Loading...</em>
                : this.getValueList(values);
        }

        const badge = values ? <span><Badge>{values.length}</Badge><br /></span> : '';

        return (
            <div className="App">
                <NavbarMain />
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                
                <MarkdownEditor text="# Test by prop"/>
                <Button bsStyle="primary" onClick={this.clickHandler}>Test API</Button> <br />
                Return Values: {badge} <p>{contents}</p>
            </div>
        );
    }
}

export default App;
