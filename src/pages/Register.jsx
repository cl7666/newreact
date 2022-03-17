import React from 'react'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import './less/Login.less'
import logoImg from '../images/logo/logo.png'
import { RegisterApi } from '../request/api'

export default function Register() {
    const navigate = useNavigate()
    const onFinish = (values) => {
        RegisterApi({
            username: values.username,
            password: values.password,
        }).then(res => {
            console.log(res);
            if (res.errCode === 0) {
                message.success(res.message);
                setTimeout(() =>
                    navigate('/login')
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
                                message: '请输入用户名！',
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
                                message: '请输入密码！',
                            },
                        ]}
                    >
                        <Input.Password size='large'
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="请输入密码" />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '请再次确认密码！',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('请输入相同的密码'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password size='large'
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="请再次确认密码" />
                    </Form.Item>
                    <Form.Item>
                        <Link to="/login">已有账号?前往登录</Link>
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
