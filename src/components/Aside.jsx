import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { ReadOutlined, EditOutlined, DatabaseFilled } from '@ant-design/icons';

export default function Aside() {
    const navigate = useNavigate()
    const location = useLocation()
    const [defaultKey,setDefaultKey] = useState('')

    useEffect(()=>{
        let path = location.pathname;
        let key = path.split('/')[1];
        setDefaultKey(key)
    },[location.pathname])
    const handleClick = e => {
        navigate('/' + e.key)
        setDefaultKey(e.key)
    };
    return (
        <Menu
            onClick={handleClick}
            style={{ width: 180 }}
            defaultSelectedKeys={[defaultKey]}
            mode="inline"
            theme='dark'
            className='aside'
        >
            <Menu.Item key="listlist"><ReadOutlined />查看文章列表list</Menu.Item>
            <Menu.Item key="listtable"><ReadOutlined />查看文章列表table</Menu.Item>
            <Menu.Item key="edit"><EditOutlined />文章编辑</Menu.Item>
            <Menu.Item key="means"><DatabaseFilled />修改资料</Menu.Item>
        </Menu>
    )
}
