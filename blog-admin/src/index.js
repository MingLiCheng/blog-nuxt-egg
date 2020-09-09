/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-05-14 16:17:50
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd'
import 'antd/dist/antd.css'
import './common/reset.less';
import '@/assets/lib/animate.css'
import '@/assets/css/global.less'
import Page from './pages/page';
import zhCN from 'antd/es/locale/zh_CN'

// ========================================

ReactDOM.render(<ConfigProvider locale={zhCN}><Page /></ConfigProvider>, document.getElementById('root'));

// 模块热替换的 API
if (module.hot) {
    module.hot.accept();
}