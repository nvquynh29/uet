import { Button, Form, Input, notification } from 'antd';
import router from 'next/router';
import React from 'react';
import MiniDrawerSuperAdmin from '../../../../../../layouts/super-admin/MiniDrawerSuperAdmin';


const AddOrganizationSuperAdmin = () => {
    const onFinish = async (values) => {
        try {
            //TODO:
            // call api add
            notification.open({
                type: "success",
                message: "Ghi nhận thành công",
                description: "Đăng ký Admin mới thành công!"
            })
            router.push('/super-admin/organization')
        } catch (error) {
            console.log(error)
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }

    return (
        <MiniDrawerSuperAdmin>
            <div className="addEvent">
                <div className="title">
                    Chỉnh sửa Admin
                </div>
                <hr />
                <div className="formContainer">
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                    >

                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập tên admin!',
                                },
                            ]}
                            label="Họ và tên"
                            className="lable"
                        >

                            <Input placeholder='Tên admin' style={{ height: '40px' }} />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập email!',
                                },
                                {
                                    type: 'email',
                                    message: 'Email không hợp lệ!'
                                }
                            ]}
                            label="Email"
                            className="lable"
                        >

                            <Input placeholder='Email' style={{ height: '40px' }} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="addEvenBtn">
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </MiniDrawerSuperAdmin>
    )
}

export default AddOrganizationSuperAdmin