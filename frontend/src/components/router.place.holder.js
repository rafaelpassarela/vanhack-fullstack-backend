import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// pages
import TestApiClass from './test.api.component';

class RouterHolder extends Component {

    render() {

        return (
            <div>
                <Route exact path="/" render={() => (
                    <h1>You're at Home</h1>
                )} />

                <Route path="/test" component={TestApiClass} />
            </div>
        );

    }

}

export default RouterHolder;