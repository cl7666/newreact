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
                title="????????????"
                subTitle={"????????????: " + moment(new Date()).format("YYYY-MM-DD")}
                extra={<Button key="1" type="primary" onClick={() => setIsModalVisible(true)}>????????????</Button>}
            ></PageHeader>
            <div id="div1" style={{ padding: '0 20px 20px', background: '#fff' }}></div>
            <Modal zIndex={99999} title="??????????????????" visible={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)} okText="??????" cancelText="??????">
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 21 }}
                    autoComplete="off"
                    initialValues={{ title, subTitle }}
                >
                    <Form.Item
                        label="??????"
                        name="title"
                        rules={[{ required: true, message: '???????????????!', },]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="?????????"
                        name="subTitle"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
