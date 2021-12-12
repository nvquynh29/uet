import {
    CheckCircleTwoTone, CloseCircleOutlined, DeleteOutlined, EditOutlined
} from '@ant-design/icons'
import { Modal, notification, Space } from 'antd'
import router from 'next/router'
import React, { useEffect, useState } from 'react'
import * as giftApi from '../../../api/gifts'
import * as bloodApi from '../../../api/requestBlood'
import CustomTable from '../../../components/custom-table/index'
import MiniDrawerSuperAdmin from '../../../layouts/super-admin/MiniDrawerSuperAdmin'
import { env } from "../../../../next.config"

export default function index() {
    const [data, setData] = useState([])
    const [filterData, setFilterData] = useState([])

    useEffect(async () => {
        try {
            const res = await giftApi.getAllGifts();
            const volunteers = res.data.map((volunteer) => {
                return { ...volunteer, key: volunteer._id }
            })
            setData(volunteers)
            setFilterData(volunteers)
            console.log(res);
        } catch (error) {
            console.log(error)
        }
    }, [])

    const addVolunteer = () => {
        // TODO: implement function
        router.push('gifts/add')
    }
    const editVolunteer = (id) => {
        // TODO: implement function
        // await volunteerApi.updateVolunteer(id, newVolunteer)
        router.push(`gifts/${id}`)
    }

    const removeVolunteer = (id) => {
        let updatedData = filterData.filter((volunteer) => volunteer._id !== id)
        setFilterData(updatedData)
        updatedData = data.filter((volunteer) => volunteer._id !== id)
        setData(updatedData)
    }

    const searchVolunteer = (e) => {
        const value = e.target.value?.toLowerCase()
        const filtered = data.filter(
            (volunteer) =>
                volunteer.name.toLowerCase().includes(value) ||
                volunteer.type.toLowerCase().includes(value),
        )
        setFilterData(filtered)
    }

    const openNotificationSuccess = () => {
        notification.success({
            icon: <CheckCircleTwoTone twoToneColor="#16ed31" />,
            duration: 3,
            message: 'Đã xoá thành công quà tặng',
        })
    }

    const deleteVolunteer = (id) => {
        Modal.confirm({
            title: 'Xoá tình tổ chức',
            icon: <CloseCircleOutlined />,
            content: 'Bạn có chắc chắn muốn xoá quà tặng này không?',
            onOk: async () => {
                try {
                    //TODO
                    //await apiDeleteGift(id)
                    removeVolunteer(id)
                    openNotificationSuccess()
                } catch (error) {
                    console.log(error)
                }
            },
            onCancel: () => { },
            centered: true,
            okText: 'Xác nhận',
            cancelText: 'Huỷ',
        })
    }

    const columns = [
        {
            title: 'Hình ảnh',
            dataIndex: 'image_path',
            key: 'image_path',
            render: (key) => <div>
                <img style={{ height: '50px' }} alt='ảnh quà' src={`${env.API_URL}/getFile?img_path=${key}`} ></img>
            </div>,
        },
        {
            title: 'Tên quà tặng',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Lượng máu hiến',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Hành động',
            key: 'action',
            dataIndex: '_id',
            render: (id) => (
                <Space size="middle">
                    <EditOutlined
                        className="cursor-pointer"
                        onClick={() => editVolunteer(id)}
                    />
                    <DeleteOutlined
                        className="cursor-pointer"
                        onClick={() => deleteVolunteer(id)}
                    />
                </Space>
            ),
        },
    ]

    return (
        <MiniDrawerSuperAdmin>
            <div className='volunteers'>
                <div className="adminTitle">
                    Danh sách quà tặng
                </div>
                <CustomTable
                    data={filterData}
                    columns={columns}
                    addBtnText="Thêm quà tặng"
                    onAddBtnClick={addVolunteer}
                    searchPlaceHolder="Tìm kiếm quà tặng"
                    onChange={searchVolunteer}
                />
            </div>
        </MiniDrawerSuperAdmin>
    )
}
