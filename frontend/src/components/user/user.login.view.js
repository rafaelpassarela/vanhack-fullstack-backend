import React, { Component } from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import UserLoginPost from './user.login.post';

class UserLoginView extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            Email: 'rafaelpassarela@gmail.com',
            PasswordHash: '123456'
        };
    }

    getEmailValidation() {
        const email = this.state.Email;

        if (email === undefined || email === '')
            return null;

        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (re.test(email.toLowerCase())) {
            return 'success'
        } else {
            return 'error'
        }
    }

    getPwdValidation() {
        const length = this.state.PasswordHash.length;
        if (length > 5) return 'success';
        else if (length > 0) return 'error';
        return null;
    }

    handleChange(e) {
        let key = {};
        key[e.target.name] = e.target.value;
       
        this.setState( key );
    }

    render() {
        const valid = (this.getEmailValidation() === 'success')
            && (this.getPwdValidation() === 'success');

        return (
            <form>
                <h2>Login</h2>
                <h4>Use a local account to log in.</h4>
                <hr/>
                <FormGroup controlId="formUserEmail" validationState={this.getEmailValidation()} >
                    <ControlLabel>EMail</ControlLabel>
                    <FormControl type="text" name="Email" value={this.state.Email} placeholder="EMail" onChange={this.handleChange} />
                    <FormControl.Feedback />
                </FormGroup>

                <FormGroup controlId="formUserPasswordHash" validationState={this.getPwdValidation()} >
                    <ControlLabel>Password <small>at least 6 chars</small></ControlLabel>
                    <FormControl type="password" name="PasswordHash" value={this.state.PasswordHash} placeholder="Password" onChange={this.handleChange} />
                    <FormControl.Feedback />
                </FormGroup>

                <UserLoginPost enabled={valid} data={this.state} />
            </form>
        );
    }
}

export default UserLoginView;