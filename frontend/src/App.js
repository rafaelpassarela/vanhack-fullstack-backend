import React, { Component } from 'react';
//import { RouteComponentProps } from 'react-router';
import logo from './logo.svg';
import './styles/App.css';
import 'isomorphic-fetch';
import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';
import MarkdownEditor from './components/markdown.editor.view';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            values: ['None'],
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
                    loading: false,
                    values: result
                });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
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
                : this.getValueList(values); // FetchData.renderForecastsTable(this.state.forecasts);
        }

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">To get started, edit <code>src/App.js</code> and save to reload.</p>
                <hr />
                <Alert>Test of Editor - Another Comp.</Alert>
                <MarkdownEditor/>
                <Button bsStyle="primary" onClick={this.clickHandler}>Test API</Button> <br />
                Return Values: <p>{contents}</p>
            </div>
        );
    }
}

export default App;
