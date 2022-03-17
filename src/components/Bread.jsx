import React, { useEffect, useState } from 'react'
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
export default function Bread() {
    const { pathname } = useLocation()
    const [breadName, setBreadName] = useState('')

    useEffect(() => {
        switch (pathname) {
            case "/listlist":
                setBreadName('查看文章列表list')
                break;
            case "/listtable":
                setBreadName('查看文章列表table')
                break;
            case "/edit":
                setBreadName('文章编辑')
                break;
            case "/means":
                setBreadName('修改资料')
                break;
            default:
                break;
        }
    }, [pathname])
    return (
        <Breadcrumb>
            <Breadcrumb.Item href='/'>
                <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>{breadName}</Breadcrumb.Item>
        </Breadcrumb>
    )
}
