import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/lib/Alert';
import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import { Redirect } from 'react-router';
import { setUser } from '../../helpers/cookie.helper';

class PostController extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sending: false,
            message: ''
        };
        this.clickHandler = this.clickHandler.bind(this);
        this.clearError = this.clearError.bind(this);
    }

    //clearError() {
    //    this.setState({ message: '' });
    //}

    //clickHandler() {
    //    this.setState({ sending: true, message: '' });

    //    fetch("http://localhost:54163/api/Account/Login", {
    //        method: 'POST',
    //        credentials: 'include',
    //        headers: {
    //            Accept: 'application/json',
    //            'Content-Type': 'application/json',
    //            'Access-Control-Allow-Origin': '*'
    //        },
    //        body: JSON.stringify(this.props.data)
    //    })
    //        .then(res => {
    //            //const token = res.headers.get('Set-Cookie');
    //            return res.json();
    //        })
    //        .then(
    //        (result) => {
    //            if (result === 'Ok') {
    //                setUser(this.props.data.Email);
    //            }
    //            this.setState({
    //                sending: false,
    //                message: result
    //            });
    //        },
    //        (error) => {
    //            this.setState({
    //                sending: false,
    //                message: error.message + ' - ' + error.stack
    //            });
    //        });
    //}

    //shouldComponentUpdate(nextProps, nextState) {
    //    if (nextState.message === 'Ok') {
    //        window.open('/', '_self');
    //        return false;
    //    }
    //    return true;
    //}

    render() {

        //if (this.state.message === 'Ok') {
        //    return <Redirect to='/' />;
        //}

        //const valid = this.props.enabled && !this.state.sending;
        //const caption = (this.state.sending) ? 'Logging In...' : 'Login';
        //const alert = (this.state.message !== '') ?
        //    <Alert bsStyle="danger" onDismiss={this.clearError}>
        //        <h4>Oh snap! We found an error!</h4>
        //        {this.state.message}
        //    </Alert> : null;

        return (
            <div>
                <Row className="show-grid">
                    <Col xs={12} sm={5} md={5} lg={5}>
                        <Button type="button" onClick={this.clickHandler} disabled={!valid}>{caption}</Button>
                    </Col>
                    <Col xs={12} sm={5} md={5} lg={5}>
                        You don't have an account yet, <Link to="/Account/Register">register here</Link>.
                    </Col>
                </Row>
                <br />
                {alert}
            </div>
        );
    }
}

export default PostController;