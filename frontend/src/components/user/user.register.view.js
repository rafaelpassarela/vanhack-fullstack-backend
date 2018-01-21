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
            value: ''
        };
    }

    getValidationState() {
        const length = this.state.value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    render() {
        return (
            <form>
                <h2>Register</h2>
                <h4>Create a new account.</h4>
                <hr/>
                <FormGroup controlId="formUserEmail" validationState={this.getValidationState()} >
                    <ControlLabel>EMail</ControlLabel>
                    <FormControl type="text" value={this.state.value} placeholder="EMail" onChange={this.handleChange} />
                    <FormControl.Feedback />
                </FormGroup>

                <FormGroup controlId="formUserPassword" validationState={this.getValidationState()} >
                    <ControlLabel>Password</ControlLabel>
                    <FormControl type="password" value={this.state.value} placeholder="Password" onChange={this.handleChange} />
                    <FormControl.Feedback />
                </FormGroup>

                <FormGroup controlId="formUserConfirmPassword" validationState={this.getValidationState()} >
                    <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl type="password" value={this.state.value} placeholder="Confirm Password" onChange={this.handleChange} />
                    <FormControl.Feedback />
                </FormGroup>

                <Button type="button">Register</Button>

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