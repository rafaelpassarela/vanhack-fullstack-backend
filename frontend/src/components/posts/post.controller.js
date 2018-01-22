import React, { Component } from 'react';
import Alert from 'react-bootstrap/lib/Alert';
import Button from 'react-bootstrap/lib/Button';
import { Redirect } from 'react-router';

class PostController extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sending: false,
            message: ''
        };
        this.clickHandler = this.clickHandler.bind(this);
        this.clearError = this.clearError.bind(this);
        this.cancelHandler = this.cancelHandler.bind(this);
    }

    clearError() {
        this.setState({ message: '' });
    }

    cancelHandler() {
        this.props.onCancel();
    }

    clickHandler() {
        this.setState({ sending: true, message: '' });

        fetch("http://localhost:54163/api/PostData/Save", {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(this.props.data)
        })
            .then(res => {
                return res.json();
            })
            .then(
            (result) => {
                this.setState({
                    sending: false,
                    message: result
                });
            },
            (error) => {
                this.setState({
                    sending: false,
                    message: error.message + ' - ' + error.stack
                });
            });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.message === 'Ok') {
            window.open('/', '_self');
            return false;
        }
        return true;
    }

    render() {

        if (this.state.message === 'Ok') {
            return <Redirect to='/' />;
        }

        const enabled = (this.props.data.categoryID > 0 && this.props.data.text !== "");

        const valid = enabled && !this.state.sending;
        const caption = (this.state.sending) ? 'Saving...' : 'Save';
        const alert = (this.state.message !== '') ?
            <Alert bsStyle="danger" onDismiss={this.clearError}>
                <h4>Oh snap! We found an error!</h4>
                {this.state.message}
            </Alert> : null;

        return (
            <span>
                <Button bsStyle="success" onClick={this.clickHandler} disabled={!valid}>{caption}</Button>&nbsp;&nbsp;&nbsp;
                <Button bsStyle="danger" onClick={this.cancelHandler} disabled={this.state.sending}>Cancel</Button>
                <br /> <br />
                {alert}
            </span>
        );
    }
}

export default PostController;