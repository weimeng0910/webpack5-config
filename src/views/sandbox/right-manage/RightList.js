import React, { useState, useEffect } from 'react';

import { Table, Tag, Button, Modal, Popover, Switch } from 'antd';
import {
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons';

import axios from 'axios';

const { confirm } = Modal;

export default function RoleList() {
    //设置状态接收数据
    const [dataSource, setDataSource] = useState([]);
    //获取数据
    useEffect(() => {
        axios
            .get('http://localhost:5000/rights?_embed=children')
            .then((res) => {
                //对首页的没有children的处理
                const list = res.data;

                //遍历数组list的children字段设成空字符串
                list.forEach((item) => {
                    if (item.children.length === 0) {
                        item.childern = '';
                    }
                });

                setDataSource(list);
            });
    }, []);
    //表格条目
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => {
                return <b>{id}</b>;
            },
        },
        {
            title: '权限名称',
            dataIndex: 'title',
        },
        {
            title: '权限路径',
            dataIndex: 'key',
            render: (key) => {
                return <Tag color='cyan'>{key}</Tag>;
            },
        },
        {
            title: '操作',
            // dataIndex: 'key'
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

                        <Popover
                            content={
                                <div style={{ textAlign: 'center' }}>
                                    {/* 开关打开或关闭 */}
                                    <Switch
                                        checked={item.pagepermisson}
                                        onChange={() =>
                                            switchMethod(item)
                                        }></Switch>
                                </div>
                            }
                            title='页面配制项'
                            trigger={
                                item.pagepermisson === undefined ? '' : 'click'
                            }>
                            <Button
                                type='primary'
                                shape='circle'
                                icon={<EditOutlined />}
                                disabled={
                                    item.pagepermisson === undefined
                                }></Button>
                        </Popover>
                    </div>
                );
            },
        },
    ];
    //处理开关的函数
    const switchMethod = (item) => {
        //console.log(item);
        item.pagepermisson = item.pagepermisson === 1 ? 0 : 1;
        setDataSource([...dataSource]);
        if (item.grade === 1) {
            axios.patch(`http://localhost:5000/rights/${item.id}`, {
                pagepermisson: item.pagepermisson,
            });
        } else {
            axios.patch(`http://localhost:5000/children/${item.id}`, {
                pagepermisson: item.pagepermisson,
            });
        }
    };
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
        // console.log(item)
        // 当前页面同步状态 + 后端同步
        if (item.grade === 1) {
            setDataSource(dataSource.filter((data) => data.id !== item.id));
            axios.delete(`http://localhost:5000/rights/${item.id}`);
        } else {
            let list = dataSource.filter((data) => data.id === item.rightId);
            list[0].children = list[0].children.filter(
                (data) => data.id !== item.id
            );
            setDataSource([...dataSource]);
            axios.delete(`http://localhost:5000/children/${item.id}`);
        }
    };
    return (
        <>
            <Table
                dataSource={dataSource}
                columns={columns}
                //分页
                pagination={{
                    pageSize: 5,
                }}
                rowKey={(item) => item.key}
                //loading
                loading={false}
            />
        </>
    );
}
