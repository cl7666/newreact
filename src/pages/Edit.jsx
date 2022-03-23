import React, { useEffect, useState } from 'react'
import { PageHeader, Button, Modal, Form, Input, message } from 'antd';
import moment from 'moment';
import E from 'wangeditor'
import { ArticleAddApi, ArticleSearchApi, ArticleUpDateApi } from '../request/api'
import { useParams, useNavigate, useLocation } from 'react-router-dom'

let editor = null
export default function Edit() {
    const navigate = useNavigate()
    const location = useLocation()
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [subTitle, setSubtitle] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const params = useParams()


    const dealDate = (errCode,msg) => {
        setIsModalVisible(false);
        if (errCode === 0) {
            message.success(msg)
            setTimeout(() => {
                navigate('/listlist')
            }, 1500);
        } else {
            message.error(msg)
        }
    }
    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                // form.resetFields();
                let { title, subTitle } = values;
                if (params.id) {
                    ArticleUpDateApi({ title, subTitle, content, id: params.id })
                    .then(res => dealDate(res.errCode,res.massage))
                } else {
                    ArticleAddApi({ title, subTitle, content })
                    .then(res => dealDate(res.errCode,res.massage))
                }
            })
            .catch(() => false);
    };

    useEffect(() => {
        editor = new E('#div1')
        editor.config.onchange = (newHtml) => {
            setContent(newHtml)
        }
        editor.create()

        //
        if (params.id) {
            ArticleSearchApi({ id: params.id }).then(res => {
                if (res.errCode === 0) {
                    editor.txt.html(res.data.content)
                    setTitle(res.data.title)
                    setSubtitle(res.data.subTitle)
                }
            })
        }

        return () => {
            editor.destroy()
        }
    }, [location.pathname])
    return (
        <div>
            <PageHeader
                ghost={false}
                onBack={params.id ? () => window.history.back() : null}
                title="文章编辑"
                subTitle={"当前日期: " + moment(new Date()).format("YYYY-MM-DD")}
                extra={<Button key="1" type="primary" onClick={() => setIsModalVisible(true)}>提交文章</Button>}
            ></PageHeader>
            <div id="div1" style={{ padding: '0 20px 20px', background: '#fff' }}></div>
            <Modal zIndex={99999} title="填写文章标题" visible={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)} okText="提交" cancelText="取消">
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 21 }}
                    autoComplete="off"
                    initialValues={{ title, subTitle }}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请填写标题!', },]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="副标题"
                        name="subTitle"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
