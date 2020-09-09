/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-05-20 17:20:59
 */
import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { PageHeader } from 'antd';
import routerConfig from '@/router/routerConfig';
import queryString from 'query-string';
import AllComponents from '@/pages/app/index';
const MainRoutes = props => {
    return (
        <Switch>
            {routerConfig.menus[0].children.map(item => {
                const PageComponent = item.component && AllComponents[item.component];
                return (
                    <Route
                        path={item.path}
                        key={item.path}
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
                                <Fragment key={item.key}>
                                    <PageHeader
                                        title={item.title}
                                        style={{ paddingLeft: 0, border: '1px solid hotpink' }}
                                    />
                                    <PageComponent {...merge} />
                                </Fragment>
                            );
                        }}
                    />
                );
            })}
            <Redirect from="/app/blog_manage" to="/app/blog_manage/article_manage" />
            <Route render={() => <Redirect to="/404" />} />
        </Switch>
    );
};

export default MainRoutes;
