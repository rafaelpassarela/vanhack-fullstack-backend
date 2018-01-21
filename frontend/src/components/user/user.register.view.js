import React, { Component } from 'react';
//import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
//import Col from 'react-bootstrap/lib/Col';
//import Grid from 'react-bootstrap/lib/Grid';
//import Row from 'react-bootstrap/lib/Row';


class UserRegisterView extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            email: '',
            password: '',
            confpwd: ''
        };
    }

    getEmailValidation() {
        const email = this.state.email;

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
        const length = this.state.password.length;
        if (length > 5) return 'success';
        else if (length > 0) return 'error';
        return null;
    }

    getConfPwdValidation() {
        if (this.state.password === undefined || this.state.password === '')
            return null;

        return (this.state.password === this.state.confpwd) ? 'success' : 'error';
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
                    <FormControl type="text" name="email" value={this.state.email} placeholder="EMail" onChange={this.handleChange} />
                    <FormControl.Feedback />
                </FormGroup>

                <FormGroup controlId="formUserPassword" validationState={this.getPwdValidation()} >
                    <ControlLabel>Password</ControlLabel>
                    <FormControl type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleChange} />
                    <FormControl.Feedback />
                </FormGroup>

                <FormGroup controlId="formUserConfirmPassword" validationState={this.getConfPwdValidation()} >
                    <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl type="password" name="confpwd" value={this.state.confpwd} placeholder="Confirm Password" onChange={this.handleChange} />
                    <FormControl.Feedback />
                </FormGroup>

                <Button type="button" disabled={!valid}>Register</Button>

            </form>
        );
    }

    /*
    render() {
        return (
            <div>
                <Form horizontal>
                    <Grid>
                        <Row>
                            <Col sm={2}>
                                <h2>Register</h2>
                                <h4>Create a new account.</h4>
                            </Col>
                        </Row>
                    </Grid>
                    <hr />
                    <FormGroup controlId="formHorizontalEmail">
                        <ControlLabel>Email</ControlLabel>
                        
                            <FormControl type="email" name="Email" id="Email" placeholder="Email" />
                        
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>Password</Col>
                        <Col sm={10}>
                            <FormControl type="password" name="Password" id="Password" placeholder="Password" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>Confirm Password</Col>
                        <Col sm={10}>
                            <FormControl type="password" name="ConfirmPassword" id="ConfirmPassword" placeholder="Confirm Password" />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="submit">Register</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
    */

}

export default UserRegisterView;