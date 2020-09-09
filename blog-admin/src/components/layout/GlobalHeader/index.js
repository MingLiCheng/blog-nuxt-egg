/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-05-20 09:59:08
 */
import React, { Component } from 'react';
import { Menu } from 'antd';
import { Link} from 'react-router-dom';
import routerConfig from '../../../router/routerConfig';
import './index.scss';
class GlobalHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: this.props.history.location.pathname.split('/')[2],
        };
    }
    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };
    render() {
        return (
            <div className="global-header-wrapper">
                <div className="header-logo-box">
                    <h2>这是GlobalHeader</h2>
                </div>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                    {routerConfig.menus.map(item => {
                        return (
                            <Menu.Item key={item.key}>
                                <Link to={item.redirect ? item.redirect : item.path}>{item.title}</Link>
                            </Menu.Item>
                        );
                    })}
                </Menu>
            </div>
        );
    }
}

export default GlobalHeader
