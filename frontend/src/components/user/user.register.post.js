import React, { Component } from 'react';
import Alert from 'react-bootstrap/lib/Alert';
import Button from 'react-bootstrap/lib/Button';
import { Redirect } from 'react-router';
import { setUser } from '../../helpers/cookie.helper';

class UserRegisterPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sending: false,
            message: ''
        };
        this.clickHandler = this.clickHandler.bind(this);
        this.clearError = this.clearError.bind(this);
    }

    clearError() {
        this.setState({ message: '' });
    }

    clickHandler() {
        this.setState({ sending: true, message: '' });

        fetch("http://localhost:54163/api/Account/Register", {
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
                //const token = res.headers.get('Set-Cookie');
                setUser(this.props.data.Email);
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

        const valid = this.props.enabled && !this.state.sending;
        const caption = (this.state.sending) ? 'Registering...' : 'Register';
        const alert = (this.state.message !== '') ?
            <Alert bsStyle="danger" onDismiss={this.clearError}>
                <h4>Oh snap! We found an error!</h4>
                {this.state.message}
            </Alert> : null;

        return (
            <div>
                <Button type="button" onClick={this.clickHandler} disabled={!valid}>{caption}</Button>
                <br/><br/>
                {alert}
            </div>
        );
    }
}

export default UserRegisterPost;