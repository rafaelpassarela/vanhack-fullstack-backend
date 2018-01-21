import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// pages
import Error404 from './error.404.view';
import TestApiClass from './test.api.component';

class RouterHolder extends Component {

    render() {

        return (
            <div>
                <Route exact path="/" render={() => (
                    <h1>You're at Home</h1>
                )} />

                <Route path="/test" component={TestApiClass} />

                <Route component={Error404} />
            </div>
        );

    }

}

export default RouterHolder;