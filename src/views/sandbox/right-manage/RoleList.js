import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal } from 'antd';
import {
    DeleteOutlined,
    UnorderedListOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons';

const { confirm } = Modal;

const Rolelist = () => {
    const [dataSource, setDataSource] = useState([]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => {
                return <b>{id}</b>;
            },
        },
        {
            title: '角色名称',
            dataIndex: 'roleName',
        },
        {
            title: '操作',

            render: (item) => {
                return (
                    <div>
                        <span style={{ margin: '0 10px' }}>
                            <Button
                                onClick={() => removeConfirm(item)}
                                danger
                                shape='circle'
                                icon={<DeleteOutlined />}></Button>
                        </span>

                        <Button
                            type='primary'
                            shape='circle'
                            icon={<UnorderedListOutlined />}></Button>
                    </div>
                );
            },
        },
    ];

    //删除处理函数
    const removeConfirm = (item) => {
        confirm({
            title: '你确定要删除?',
            icon: <ExclamationCircleOutlined />,
            // content: 'Some descriptions',
            onOk() {
                // console.log('OK');
                deleteMethod(item);
            },
            onCancel() {
                //   console.log('Cancel');
            },
        });
    };
    //删除
    const deleteMethod = (item) => {
        //console.log(item);
        setDataSource(dataSource.filter((data) => data.id !== item.id));
        axios.delete(`http://localhost:5000/roles/${item.id}`);
    };
    useEffect(() => {
        axios.get('http://localhost:5000/roles').then((res) => {
            const list = res.data;

            setDataSource(list);
        });
    }, []);

    return (
        <>
            <Table
                dataSource={dataSource}
                columns={columns}
                //分页
                pagination={{
                    pageSize: 5,
                }}
                //给遍历的每一项分配key值唯一
                rowKey={(item) => item.id}
                //loading
                loading={false}
            />
        </>
    );
};

export default Rolelist;
