import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Tree } from 'antd';
import {
    DeleteOutlined,
    UnorderedListOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons';

const { confirm } = Modal;

const Rolelist = () => {
    //角色列表显示的数据状态
    const [dataSource, setDataSource] = useState([]);
    //是否显示模态框的状态
    const [isModalVisible, setisModalVisible] = useState(false);
    //模态框中的数据状态
    const [rightsList, setRightsList] = useState([]);
    //模态框中的数据选中的列表ID
    const [currentId, setcurrentId] = useState(0);
    //设置选中的列表的状态
    const [currentRights, setCurrentRights] = useState([]);
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
                            onClick={() => {
                                setisModalVisible(true);
                                setCurrentRights(item.rights);
                                setcurrentId(item.id);
                            }}
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
    //获取角色列表的数据
    useEffect(() => {
        axios.get('http://localhost:5000/roles').then((res) => {
            setDataSource(res.data);
        });
    }, []);
    //获取所有功能的数据
    useEffect(() => {
        axios
            .get('http://localhost:5000/rights?_embed=children')
            .then((res) => {
                setRightsList(res.data);
            });
    }, []);

    //模态框中点击确定后的处理
    const handleOk = () => {
        console.log(currentRights);
        //点击确定后，关闭模态框
        setisModalVisible(false);
        //根据获取的ID同步数据改变dataSource中的rights项
        setDataSource(
            dataSource.map((item) => {
                if (item.id === currentId) {
                    return {
                        ...item,
                        rights: currentRights,
                    };
                }
                return item;
            })
        );

        //更新数据库中数据patch
        axios.patch(`http://localhost:5000/roles/${currentId}`, {
            rights: currentRights,
        });
    };

    //点击取消或关闭后改变显示状态
    const handleCancel = () => {
        setisModalVisible(false);
    };
  
    //Tree中点击选中与否的处理函数
    const onCheck = (checkedKeys) => {
        //console.log(checkedKeys);
        //将钩选后的值重新设置回数据中
        setCurrentRights(checkedKeys.checked);
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
                //给遍历的每一项分配key值唯一
                rowKey={(item) => item.id}
                //loading
                loading={false}
            />

            <Modal
                title='权限分配'
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}>
                <Tree
                    checkedKeys={currentRights}
                    onCheck={onCheck}
                    checkable={true}
                    checkStrictly={true}
                    treeData={rightsList}
                />
            </Modal>
        </>
    );
};

export default Rolelist;
