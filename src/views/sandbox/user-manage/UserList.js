import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
//导入antd组件
import { Table, Button, Modal, Switch } from 'antd';
//导入ico
import {
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons';
//导入子组件Form表单
import UserForm from '@/components/user-manage/UserForm';

const { confirm } = Modal;

export default function UserList() {
    //定义父组件的Ref传递给子组件，穿透子组件获取子组件的表单属性
    const userListRef = useRef(null);
    const addForm = useRef(null);
    //数据状态
    const [dataSource, setDataSource] = useState([]);
    //显示弹出表单的状态
    const [isAddVisible, setIsAddVisible] = useState(false);
    //弹出修改的状态
    const [isUpdateVisible, setIsUpdateVisible] = useState(false);
    const [roleList, setRoleList] = useState([]);
    const [regionList, setRegionList] = useState([]);
    const [currentState, setcurrentState] = useState(false);

    //从localStorage检索对象来获取用户的登陆信息， JSON.parse() 方法将数据转换为 JavaScript 对象。
    //从对角中解构出相应的字段
    const { roleId, region, username } = JSON.parse(
        localStorage.getItem('token')
    );

    //获取数据
    useEffect(() => {
        //设置roleId的映射对象，因为roleId的value值是1，2，3在判断数据中使用此映射对象
        const roleObj = {
            1: 'superadmin',
            2: 'admin',
            3: 'editor',
        };
        axios.get('/users?_expand=role').then((res) => {
            console.log('111', res.data);
            const list = res.data;
            setDataSource(
                roleObj[roleId] === 'superadmin'
                    ? list
                    : [
                          ...list.filter((item) => item.username === username),
                          ...list.filter(
                              (item) =>
                                  item.region === region &&
                                  roleObj[item.roleId] === 'editor'
                          ),
                      ]
            );
        });
    }, [roleId, region, username]);

    //表单中读取的区域的数据获得
    useEffect(() => {
        axios.get('/regions').then((res) => {
            //console.log(res.data);
            setRegionList(res.data);
        });
    }, []);
    //表单中读取的角色的数据获得
    useEffect(() => {
        axios.get('/roles').then((res) => {
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
                return <b>{region != '' ? region : '全球'}</b>;
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
                        disabled={item.default}
                        onChange={() => handleChange(item)}></Switch>
                );
            },
        },
        {
            title: '操作',
            render: (item) => {
                return (
                    <div>
                        <Button
                            danger
                            shape='circle'
                            icon={<DeleteOutlined />}
                            onClick={() => confirmMethod(item)}
                            disabled={item.default}
                        />

                        <Button
                            type='primary'
                            shape='circle'
                            icon={<EditOutlined />}
                            disabled={item.default}
                            onClick={() => handleUpdate(item)}
                        />
                    </div>
                );
            },
        },
    ];
    //弹出更新模态框
    const handleUpdate = (item) => {
        //对话框模块还没显示，也就是表单还没挂载就调用了setFieldsValue，所以报错添加setTimeout
        //handleUpdate Antd 表单是异步的,所以要添加setTimeout
        setTimeout(() => {
            setIsUpdateVisible(true);
            if (item.roleId === 1) {
                //禁用
                userListRef.current.setIsDisabled(true);
            } else {
                //取消禁用
                userListRef.current.setIsDisabled(false);
            }

            //console.log(userListRef.current.form.setFieldsValue(item));
            userListRef.current.setFieldsValue(item);
        }, 0);
        setcurrentState(item);
    };
    //更新提交
    const updateFormOK = () => {
        userListRef.current.validateFields().then((value) => {
            //关闭模态框
            setIsUpdateVisible(false);
            setDataSource(
                dataSource.map((item) => {
                    if (item.id == currentState.id) {
                        return {
                            ...item,
                            ...value,
                            role: roleList.filter(
                                (date) => date.id === value.roleId
                            )[0],
                        };
                    }
                    return item;
                })
            );
            axios.patch(`/users/${currentState.id}`, value);
        });
    };
    //关闭角色的按钮处理函数
    const handleChange = (item) => {
        item.roleState = !item.roleState;
        setDataSource([...dataSource]);
        //更新数据
        axios.patch(`/users/${item.id}`, {
            roleState: item.roleState,
        });
    };
    //删除处理函数
    const confirmMethod = (item) => {
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
        // 当前页面同步状态 + 后端同步
        setDataSource(dataSource.filter((data) => data.id !== item.id));
        axios.delete(`/users/${item.id}`);
    };
    //确定提交
    const addFormOK = () => {
        //console.log(userListRef.current);
        //点击确定后，访问子组件开放给父组件的方法，从而获得form表单的value
        addForm.current
            .validateFields()
            .then((value) => {
                console.log(value);
                //关闭模态框
                setIsAddVisible(false);
                //重置表单

                addForm.current.resetFields();

                //post到后端，生成id，再设置 datasource, 方便后面的删除和更新
                axios
                    .post(`/users`, {
                        //组装数据
                        ...value,
                        roleState: true,
                        default: false,
                    })
                    .then((res) => {
                        //console.log('111', res.data);
                        setDataSource([
                            ...dataSource,
                            {
                                ...res.data,

                                role: roleList.filter(
                                    (item) => item.id === value.roleId
                                )[0],
                            },
                        ]);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    };
    //弹出提交表单
    const handleSubmit = () => {
        setTimeout(() => {
            setIsAddVisible(true);
            //userListRef.current.resetFields();
        }, 100);
    };
    return (
        <>
            <Button
                type='primary'
                onClick={() => {
                    handleSubmit();
                    //setIsAddVisible(true);
                }}>
                添加用户
            </Button>
            <Table
                columns={columns}
                dataSource={dataSource}
                //分页
                pagination={{
                    pageSize: 5,
                }}
                //给遍历的每一项分配key值唯一
                rowKey={(item) => item.id}
            />
            {/* 弹出表单 */}
            <Modal
                visible={isAddVisible}
                title='添加用户'
                okText='确定'
                cancelText='取消'
                onCancel={() => {
                    setIsAddVisible(false);
                    addForm.current.resetFields();
                }}
                onOk={() => addFormOK()}>
                <UserForm
                    roleList={roleList}
                    regionList={regionList}
                    ref={addForm}
                />
            </Modal>
            {/* 修改选中项弹出的模态框 */}
            <Modal
                visible={isUpdateVisible}
                title='修改用户'
                okText='更新'
                cancelText='取消'
                forceRender={true}
                onCancel={() => {
                    setIsUpdateVisible(false);
                }}
                onOk={() => updateFormOK()}>
                <UserForm
                    roleList={roleList}
                    regionList={regionList}
                    ref={userListRef}
                    isUpdate={true}
                />
            </Modal>
        </>
    );
}
