import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Badge from 'react-bootstrap/lib/Badge';

class TestApiClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: undefined,
            loading: false
        };

        this.clickHandler = this.clickHandler.bind(this);
    }

    getValueList(values) {
        if (values === undefined)
            return "None";
        else {
            const items = values.map(function (val, i) {
                return <span key={i}>&hearts; {i} - {val} <br /> </span>;
            });
            return items;
        }
    }

    clickHandler() {
        this.setState({ loading: true, error: undefined });

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
            <div>
                <h1>Simple API Test</h1>
                <Button bsStyle="primary" onClick={this.clickHandler}>Test API</Button> <br />
                Return Values: {badge} <p>{contents}</p>
            </div>
        );
    }

}

export default TestApiClass;