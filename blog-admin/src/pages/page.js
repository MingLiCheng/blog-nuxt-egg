/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-05-26 14:00:38
 */
import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './NotFound/index';
import Login from './Login/index';
import App from './app/App';

export default () => (
    <Router>
        <Switch>
            <Route
                exact
                path="/"
                render={() => <Redirect to="/app/blog_manage/article_manage" push />}
            />
            <Route path="/app" component={App} />
            <Route path="/404" component={NotFound} />
            <Route path="/login" component={Login} />
            <Route component={NotFound} />
        </Switch>
    </Router>
)
