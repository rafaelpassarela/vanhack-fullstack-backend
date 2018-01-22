import React, { Component } from 'react';
import { getIsUserLogged, removeUser } from '../../helpers/cookie.helper';

class UserLogoutView extends Component {

    constructor(props) {
        super(props);

        this.performLogout = this.performLogout.bind(this);
        this.goToHome = this.goToHome.bind(this);
    }

    performLogout() {

        fetch("http://localhost:54163/api/Account/Logout", {
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
                removeUser();
                this.goToHome();
            },
            (error) => {
                alert(error.message);
                this.goToHome();
            });
    }

    goToHome() {
        window.open('/', '_self');
    }

    componentDidMount() {
        if (getIsUserLogged) {
            this.performLogout();
        } else {
            this.goToHome();
        }
    }

    render() {
        return (
            <h1>Please wait... Leaving the session...</h1>
        );
    }
}

export default UserLogoutView;