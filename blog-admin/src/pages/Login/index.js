/*
 * @Description:
 * @Author: cml321@hotmail.com
 * @Date: 2020-05-26 14:15:55
 */
import React, { useState, useEffect } from 'react'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Checkbox, Button, Input } from 'antd'
import { Base64 } from 'js-base64'
import CookiesUtils from '../../utils/cookiesUtils'
import Api from '@/api'
import './index.less'

function Login(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState('')
    const [isRemember, setIsRemember] = useState(false)

    useEffect(() => {
        const userLoginInfo = JSON.parse(CookiesUtils.getCookie('UserLoginInfo')) || null
        if (userLoginInfo) {
            setUsername(userLoginInfo.username)
            setPassword(Base64.decode(userLoginInfo.password))
            setIsRemember(userLoginInfo.isRemember)
        }
    }, [])

    const submitToLogin = () => {
        console.log('process.env.NODE_ENV', process.env.NODE_ENV === 'development')

        let params = {
            username,
            password: Base64.encode(password),
        }
        console.log('params', params)
        loginApi(params)
    }

    const loginApi = async params => {
        const res = await Api.login(params)
        console.log('res', res)
        if (res.status === 0) {
            //   登陆成功之后 保存用户信息
            if (isRemember) {
                CookiesUtils.setCookie(
                    'UserLoginInfo',
                    JSON.stringify({
                        username: params.username,
                        password: params.password,
                        isRemember: true,
                    }),
                    10
                )
            }
            props.history.replace('/')
        } else {
            setLoginError(res.msg)
        }
    }
    const usernameInputBlur = e => {
        // 校验用户名
        console.log('username', username, e.detail)
    }
    return (
        <div className="login-wrapper">
            <div className="loginContent">
                <h1 className="title">后台管理系统</h1>
                <ul className="login-list">
                    <li className="account-input">
                        <Input
                            value={username}
                            placeholder="请输入用户名"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            onChange={e => setUsername(e.target.value)}
                            onBlur={e => usernameInputBlur(e)}
                        />
                    </li>
                    <li className="password-input">
                        <Input.Password
                            value={password}
                            placeholder="请输入密码"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            onChange={e => setPassword(e.target.value)}
                            onPressEnter={submitToLogin}
                        />
                    </li>
                    <li>
                        <Checkbox
                            checked={isRemember}
                            onChange={e => setIsRemember(e.target.checked)}
                        >
                            记住账号
                        </Checkbox>
                    </li>
                    <li>
                        <Button type="primary" onClick={submitToLogin}>
                            登录
                        </Button>
                    </li>
                    <li>
                        <span style={{ color: 'red' }}>{loginError}</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Login
