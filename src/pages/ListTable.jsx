import React, { useEffect, useState } from 'react'
import { Table, Button, Space } from 'antd';
import './less/ListTable.less'
import { Link } from 'react-router-dom'
import moment from 'moment';
import { ArticleListApi } from '../request/api';
export default function ListTable() {
    const [arr, setArr] = useState([
        {
            key: '1',
            name: '1111',
            subName: "asda",
            address: '111233'
        }
    ])

    useEffect(() => {
        ArticleListApi().then(res => {
            if (res.errCode === 0) {
                let newArr = JSON.parse(JSON.stringify(res.data.arr));
                newArr.map(item => {
                    item.key = item.id;
                    item.data = moment(item.data).format("YYYY-MM-DD hh:mm:")
                    item.mytitle =
                        `<div>
                        <Link className='table_title' to='/'>${item.title}</Link>
                        <p style={{color:'#999'}}>${item.subTitle}</p>
                    </div>`
                    setArr(newArr)
                })
            }
        })
    }, [])
    const columns = [
        {
            dataIndex: 'mytitle',
            key: 'mytitle',
            width: '60%',
            render: text => <div dangerouslySetInnerHTML={{ __html: text }}></div>,
        },
        {
            dataIndex: 'date',
            key: 'date',
            render: text => <div>{text}</div>,
        },
        {
            dataIndex: 'address',
            key: 'address',
        },
        {
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type='primary'>编辑</Button>
                    <Button type='danger'>删除</Button>
                </Space>
            ),
        },
    ];

    return (
        <div className='list_table'>
            <Table showHeader={false} columns={columns} dataSource={arr} />
        </div>
    )
}
