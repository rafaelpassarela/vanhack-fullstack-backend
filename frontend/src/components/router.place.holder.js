import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// pages
import Error404 from './error.404.view';
import TestApiClass from './test.api.component';
import HomeMain from './home.main.view';

//<Route exact path="/" render={() => (
//    <h1>You're at Home</h1>
//)} />

class RouterHolder extends Component {

    render() {

        return (
            <div>
                <Switch>
                    <Route path="/" exact component={HomeMain} />
                    <Route path="/test" component={TestApiClass} />

                    <Route component={Error404} />
                </Switch>
            </div>
        );

    }

}

export default RouterHolder;