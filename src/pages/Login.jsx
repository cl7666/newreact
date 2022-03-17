import React from 'react'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import './less/Login.less'
import logoImg from '../images/logo/logo.png'
import { LoginApi } from '../request/api'

export default function Login() {
    const navigate = useNavigate()
    const onFinish = (values) => {
        console.log('Success:', values);
        LoginApi({
            username: values.username,
            password: values.password,
        }).then(res => {
            if (res.errCode === 0) {
                message.success(res.message);
                localStorage.setItem('avatar',res.data.avatar)
                localStorage.setItem('cms-token',res.data['cms-token'])
                localStorage.setItem('editable',res.data.editable)
                localStorage.setItem('player',res.data.player)
                localStorage.setItem('username',res.data.username)
                setTimeout(() =>
                    navigate('/')
                    , 1500)
            } else {
                message.error(res.message);
            }
        })
    };

    return (
        <div className='login'>
            <div className='login_box'>
                <img src={logoImg} alt=''></img>
                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input size='large'
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="请输入用户名" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password size='large'
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="请输入密码" />
                    </Form.Item>

                    <Form.Item>
                        <Link to="/register">没有账号?前往注册</Link>
                    </Form.Item>

                    <Form.Item>
                        <Button size='large' type="primary" htmlType="submit" block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
