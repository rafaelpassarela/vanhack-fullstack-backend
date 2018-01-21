import React, { Component } from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import NavbarItem from './navbar.item';
import logo from '../img/vh_logo.png';

class NavbarMain extends Component {

    render() {
        const navbarInstance =
            <Navbar inverse collapseOnSelect fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">
                            <img src={logo} alt="Vanhack Fullstack/Backend" />
                        </a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavbarItem eventKey={1} to="/" caption="Home" />
                        <NavbarItem eventKey={2} to="/test" caption="API Test" />

                        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>Action</MenuItem>
                            <MenuItem eventKey={3.2}>Another action</MenuItem>
                            <MenuItem eventKey={3.3}>Something else here</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.3}>Separated link</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavbarItem eventKey={1} to="/Account/Register" caption="Register" />
                        <NavbarItem eventKey={2} to="/login" caption="Login" />
                    </Nav>
                </Navbar.Collapse>
            </Navbar>;

        return navbarInstance;

    }
}

export default NavbarMain;