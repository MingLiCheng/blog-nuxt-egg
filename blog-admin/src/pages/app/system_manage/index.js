/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-05-20 11:39:12
 */
import React, { Component } from 'react';

class SystemMange extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    return (
        <div>
            <h2>这是{this.props.componentRouterInfo.title}</h2>
        </div>
    );
  }
}

export default SystemMange;