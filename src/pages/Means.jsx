import React, { useEffect, useState } from 'react'
import { Form, Input, Button, message, Upload } from 'antd';
import { GetUserDateApi, ChangeUserDateApi } from '../request/api'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './less/means.less'

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 / 1024 < 200;
    if (!isLt2M) {
        message.error('Image must smaller than 200kb!');
    }
    return isJpgOrPng && isLt2M;
}
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
export default function Means() {
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState("")
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    useEffect(() => [
        GetUserDateApi().then(res => {
            if (res.errCode === 0) {
                message.success(res.message)
                sessionStorage.setItem('username', res.data.username)
            }
        })
    ], [])

    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                setLoading(false)
                setImageUrl(imageUrl)
            }
            );
        }
    };

    const onFinish = (values) => {
        console.log(values);
        if (values.username && values.username == sessionStorage.getItem('username') && values.password.trim() !== "") {
            ChangeUserDateApi({
                username: values.username,
                password: values.password
            }).then(res => {
                console.log(res);
            })
        }
    }
    return (

        <div className='means'>
            <Form
                name="basic"
                style={{ width: "400px" }}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item label="??????????????????" name="username">
                    <Input placeholder='?????????????????????' />
                </Form.Item>

                <Form.Item label="???????????????" name="password">
                    <Input.Password placeholder='??????????????????' />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ float: "right" }}>
                        ??????
                    </Button>
                </Form.Item>
            </Form>
            <p>???????????????????????????</p>
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/api/upload"
                beforeUpload={beforeUpload}
                onChange={handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        </div>
    )
}
