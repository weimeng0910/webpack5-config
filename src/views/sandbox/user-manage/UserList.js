import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
//导入antd组件
import { Table, Button, Modal, Switch } from 'antd';
//导入ico
import {
    DeleteOutlined,
    UnorderedListOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons';
//导入子组件Form表单
import UserForm from '../../../components/user-manage/UserForm';

const { confirm } = Modal;

export default function UserList() {
    //穿透子组件获取子组件的表单属性
    const formRef = useRef(null);
    //数据状态
    const [dataSource, setDataSource] = useState([]);
    //显示弹出表单的状态
    const [isAddVisible, setIsAddVisible] = useState(false);
    const [roleList, setRoleList] = useState([]);
    const [regionList, setRegionList] = useState([]);
    //获取数据
    useEffect(() => {
        axios.get('http://localhost:5000/users?_expand=role').then((res) => {
            //console.log(res.data);
            setDataSource(res.data);
        });
    }, []);
    //表单中读取的区域的数据获得
    useEffect(() => {
        axios.get('http://localhost:5000/regions').then((res) => {
            //console.log(res.data);
            setRegionList(res.data);
        });
    }, []);
    //表单中读取的角色的数据获得
    useEffect(() => {
        axios.get('http://localhost:5000/roles').then((res) => {
            //console.log(res.data);
            setRoleList(res.data);
        });
    }, []);
    //定义表格结构数据
    const columns = [
        {
            title: '区域',
            dataIndex: 'region',
            render: (region) => {
                return <b>{region === '' ? '全球' : region}</b>;
            },
        },
        {
            title: '角色名称',
            dataIndex: 'role',
            render: (role) => {
                return role?.roleName;
            },
        },
        {
            title: '用户名',
            dataIndex: 'username',
        },
        {
            title: '用户状态',
            dataIndex: 'roleState',
            render: (roleState, item) => {
                return (
                    <Switch
                        checked={roleState}
                        disabled={item.default}></Switch>
                );
            },
        },
        {
            title: '操作',

            render: (item) => {
                return (
                    <div>
                        <span style={{ margin: '0 10px' }}>
                            <Button
                                danger
                                shape='circle'
                                onClick={() => removeConfirm(item)}
                                icon={<DeleteOutlined />}
                                disabled={item.default}></Button>
                        </span>

                        <Button
                            type='primary'
                            shape='circle'
                            icon={<UnorderedListOutlined />}
                            disabled={item.default}></Button>
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
        console.log(item);
        // 当前页面同步状态 + 后端同步
        // if (item.grade === 1) {
        //     setDataSource(dataSource.filter((data) => data.id !== item.id));
        //     axios.delete(`http://localhost:5000/rights/${item.id}`);
        // } else {
        //     let list = dataSource.filter((data) => data.id === item.rightId);
        //     list[0].children = list[0].children.filter(
        //         (data) => data.id !== item.id
        //     );
        //     setDataSource([...dataSource]);
        //     axios.delete(`http://localhost:5000/children/${item.id}`);
        // }
    };
    const addFormOK = () => {
        formRef.current
            .validateFields()
            .then((value) => {
                console.log(value);

                // setisAddVisible(false);

                //post到后端，生成id，再设置 datasource, 方便后面的删除和更新
                // axios
                //     .post(`http://localhost:5000/users`, {
                //         ...value,
                //         roleState: true,
                //         default: false,
                //     })
                //     .then((res) => {
                //         console.log(res.data);
                //         setdataSource([...dataSource, res.data]);
                //     });
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <Button
                type='primary'
                onClick={() => {
                    setIsAddVisible(true);
                }}>
                添加用户
            </Button>
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
            {/* 弹出表单 */}
            <Modal
                visible={isAddVisible}
                title='添加用户'
                okText='确定'
                cancelText='取消'
                onCancel={() => {
                    setIsAddVisible(false);
                }}
                onOk={() => addFormOK()}>
                <UserForm
                    roleList={roleList}
                    regionList={regionList}
                    ref={formRef}
                />
            </Modal>
        </>
    );
}
