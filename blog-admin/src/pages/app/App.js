/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-05-15 11:05:52
 */
import React from 'react';
import {  Route } from 'react-router-dom';
import GlobalHeader from '../../components/layout/GlobalHeader/index';
import Routes from '../../router/index';
import './App.less';

function AppRouter() {
    return (
        <div className="wrapper">
                <header style={{ position: 'fixed', zIndex: 1, width: '100%', top: '0px' }}>
                    <Route path="/app" component={GlobalHeader} />
                </header>

                <main className="wrapper-main">
                    <div className="main-wrapper">
                        <Routes />
                    </div>
                </main>
                <footer>footer</footer>
        </div>
    );
}
export default AppRouter;
