/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-05-20 17:15:58
 */
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import routerConfig from '@/router/routerConfig';
import { Menu } from 'antd';
class SiderMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentKey: '',
    }
  }
  componentDidMount() {
    this.setState((state, props) => ({
      currentKey: props.history.location.pathname.split('/')[3],
    }))
  }
  UNSAFE_componentWillReceiveProps() {
    console.log('SiderMenu ---  componentWillReceiveProps')
    this.setState({
      currentKey: this.props.history.location.pathname.split('/')[3],
    })
  }
  handleClick(e) {
    this.setState({
      currentKey: e.key,
    })
  }

  render() {
    return (
      <Menu
        onClick={e => this.handleClick(e)}
        style={{ width: 198 }}
        defaultSelectedKeys={[`${this.state.currentKey}`]}
        selectedKeys={[`${this.state.currentKey}`]}
        mode="inline"
      >
        {routerConfig.menus[0].children.map(item => {
          return (
            <Menu.Item key={item.key}>
              <Link to={item.path}>{item.title}</Link>
            </Menu.Item>
          )
        })}
      </Menu>
    )
  }
}

export default SiderMenu;
