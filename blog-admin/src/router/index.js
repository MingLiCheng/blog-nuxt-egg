/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-05-20 11:42:46
 */
import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import routesConfig from './routerConfig';
import queryString from 'query-string';
import AllComponents from '../pages/app/index';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Switch>
                {routesConfig.menus.map(item => {
                    const PageComponent = item.component && AllComponents[item.component];
                    return (
                        <Route
                            key={item.path}
                            path={item.path}
                            render={props => {
                                const reg = /\?\S*/g;
                                // 匹配?及其以后字符串
                                const queryParams = window.location.hash.match(reg);
                                // 去除?的参数
                                const { params } = props.match;
                                Object.keys(params).forEach(key => {
                                    params[key] = params[key] && params[key].replace(reg, '');
                                });
                                props.match.params = { ...params };
                                const merge = {
                                    ...props,
                                    query: queryParams ? queryString.parse(queryParams[0]) : {},
                                    componentRouterInfo: item,
                                };
                                return (
                                    <Fragment>
                                        {PageComponent && <PageComponent {...merge} />}
                                    </Fragment>
                                );
                            }}
                        />
                    );
                })}
                <Route render={() => <Redirect to="/404" />} />
            </Switch>
        );
    }
}

export default index;
