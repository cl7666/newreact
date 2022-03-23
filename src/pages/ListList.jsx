import React, { useEffect, useState } from 'react'
import { List, Skeleton, Pagination, Button, message } from 'antd';
import { ArticleListApi, ArticleDelApi } from '../request/api'
import { useNavigate } from 'react-router-dom'
import moment from 'moment';


export default function ListList() {
    const navigate = useNavigate()
    const [list, setList] = useState([])
    const { upDate, setUpdate } = useState([])
    const [total, setTotal] = useState(0)
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const getList = (num) => {
        ArticleListApi({
            num: num,
            current: pageSize
        }).then(res => {
            if (res.errCode === 0) {
                let { arr, total, num, count } = res.data;
                setList(arr)
                setTotal(total)
                setCurrent(num)
                setPageSize(count)
            }
        })
    }
    useEffect(() => {
        getList(current)
    }, [])
    useEffect(() => {
        getList(current)
    }, [upDate])
    const onChange = (pages) => {
        setCurrent(pages)
    }
    const delFn = (id) => {
        ArticleDelApi({ id }).then(res => {
            if (res.errCode === 0) {
                message.success(res.message)
                //重新刷新网页，要么重新请求这个列表的数据， window.reload getList(current)
                setUpdate(upDate+1)
            }
        })
    }
    return (
        <div className='list_table' style={{ padding: "20px" }}>
            <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={list}
                renderItem={item => (
                    <List.Item
                        actions={[
                            <Button type="primary" onClick={() => navigate('/edit/' + item.id)}>编辑</Button>,
                            <Button type="danger" onClick={() => {
                                delFn(item.id)
                            }}>删除</Button>
                        ]}
                    >
                        <Skeleton loading={false}>
                            <List.Item.Meta
                                title={<a href="#">{item.title}</a>}
                                description={item.subTitle}
                            />
                            <div>{moment(item.date).format("YYYY-MM-DD hh:mm:ss")}</div>
                        </Skeleton>
                    </List.Item>
                )}
            />
            <Pagination onChange={onChange} total={total} current={current} pageSize={pageSize} />
        </div>
    )
}
