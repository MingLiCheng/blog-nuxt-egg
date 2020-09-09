/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-05-20 15:04:08
 */
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ArticleList from './article_list/index';
import ArticleDetail from './article_detail/index';

class ArticleManage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Switch>
                <Route path="/app/blog_manage/article_manage/list" component={ArticleList} />
                <Route
                    path="/app/blog_manage/article_manage/detail/:articleId"
                    component={ArticleDetail}
                />
                <Redirect
                    form="/app/blog_manage/article_manage"
                    to="/app/blog_manage/article_manage/list"
                />
                <Route render={() => <Redirect to="/404" />} />
            </Switch>
        )
    }
}

export default ArticleManage;
