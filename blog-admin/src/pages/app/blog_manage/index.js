/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-05-20 11:39:00
 */
import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { Layout } from 'antd';
import './index.less';

import SiderMenu from './components/SiderMenu/index';
import MainRoutes from './components/MainRoutes/index';

const { Sider, Content } = Layout;
class BlogManage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="blog-manage-wrapper">
                <Layout>
                    <Sider>
                        <Route path="/app/blog_manage" component={SiderMenu} />
                    </Sider>
                    <Layout>
                        <Content>
                            <MainRoutes />
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default BlogManage;
