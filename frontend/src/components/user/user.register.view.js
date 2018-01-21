import React, { Component } from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import UserRegisterPost from './user.register.post';

class UserRegisterView extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            Email: 'rafaelpassarela@gmail.com',
            Password: '123456',
            ConfirmPassword: '123456'
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
        const length = this.state.Password.length;
        if (length > 5) return 'success';
        else if (length > 0) return 'error';
        return null;
    }

    getConfPwdValidation() {
        if (this.state.Password === undefined || this.state.Password === '')
            return null;

        return (this.state.Password === this.state.ConfirmPassword) ? 'success' : 'error';
    }

    handleChange(e) {
        let key = {};
        key[e.target.name] = e.target.value;
       
        this.setState( key );
    }

    render() {
        const valid = (this.getEmailValidation() === 'success')
            && (this.getPwdValidation() === 'success')
            && (this.getConfPwdValidation() === 'success');

        return (
            <form>
                <h2>Register</h2>
                <h4>Create a new account.</h4>
                <hr/>
                <FormGroup controlId="formUserEmail" validationState={this.getEmailValidation()} >
                    <ControlLabel>EMail</ControlLabel>
                    <FormControl type="text" name="Email" value={this.state.Email} placeholder="EMail" onChange={this.handleChange} />
                    <FormControl.Feedback />
                </FormGroup>

                <FormGroup controlId="formUserPassword" validationState={this.getPwdValidation()} >
                    <ControlLabel>Password <small>at least 6 chars</small></ControlLabel>
                    <FormControl type="password" name="Password" value={this.state.Password} placeholder="Password" onChange={this.handleChange} />
                    <FormControl.Feedback />
                </FormGroup>

                <FormGroup controlId="formUserConfirmPassword" validationState={this.getConfPwdValidation()} >
                    <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl type="password" name="ConfirmPassword" value={this.state.ConfirmPassword} placeholder="Confirm Password" onChange={this.handleChange} />
                    <FormControl.Feedback />
                </FormGroup>

                <UserRegisterPost enabled={valid} data={this.state} />
            </form>
        );
    }
}

export default UserRegisterView;