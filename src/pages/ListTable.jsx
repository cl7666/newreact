import React, { useEffect, useState } from 'react'
import { Table, Button, Space, message } from 'antd';
import './less/ListTable.less'
import moment from 'moment';
import { ArticleListApi, ArticleDelApi } from '../request/api';
import { useNavigate } from 'react-router-dom'


function MyTitle(props) {
    return (
        <div>
            <a className='table_title' href={'http://codesohigh.com:8765/article/' + props.id} target="_blank">{props.title}
            </a>
            <p style={{ color: '#999' }}>{props.subTitle}</p>
        </div>
    )
}
export default function ListTable() {
    const navigate = useNavigate()
    const [arr, setArr] = useState([])
    const [pagination, setPagenation] = useState({ current: 1, pageSize: 10, total: 0 })
    const getArticleList = (current, pageSize) => {
        ArticleListApi({
            num: current,
            count: pageSize
        }).then(res => {
            if (res.errCode === 0) {
                console.log(res.data);
                let { num, count, total } = res.data;
                setPagenation({
                    current: num,
                    pageSize: count,
                    total
                })
                let newArr = JSON.parse(JSON.stringify(res.data.arr));
                let myarr = []
                newArr.map(item => {
                    let obj = {
                        key: item.id,
                        date: moment(item.date).format("YYYY-MM-DD hh:mm:ss"),
                        mytitle: <MyTitle id={item.id} title={item.title} subTitle={item.subTitle} />
                    }
                    myarr.push(obj)
                })
                setArr(myarr)
            }
        })
    }
    useEffect(() => {
        getArticleList(pagination.current, pagination.pageSize)
    }, [])
    const pageChange = (arg) => {
        getArticleList(arg.current, arg.pageSize)
    }
    const delFn = (id) => {
        ArticleDelApi({ id }).then(res => {
            if (res.errCode === 0) {
                message.success(res.message)
                //重新刷新网页，要么重新请求这个列表的数据， window.reload getList(current)
                getArticleList(1, pagination.pageSize)
            }
        })
    }
    const columns = [
        {
            dataIndex: 'mytitle',
            key: 'mytitle',
            width: '60%',
            render: text => <div>{text}</div>,
        },
        {
            dataIndex: 'date',
            key: 'date',
            render: text => <div>{text}</div>,
        },
        {
            key: 'action',
            render: text => (
                <Space size="middle">
                    <Button type='primary' onClick={() => navigate('/edit/' + text.key)}>编辑</Button>
                    <Button type='danger' onClick={() => delFn(text.key)}>删除</Button>
                </Space>
            ),
        },
    ];

    return (
        <div className='list_table'>
            <Table
                showHeader={false}
                columns={columns}
                dataSource={arr}
                onChange={pageChange}
                pagination={pagination}
            />
        </div>
    )
}
