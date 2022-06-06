import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Dropdown, Menu, Avatar } from 'antd';

//导入钩子用于连接redux获取状态和更改状态的方法
import { useDispatch, useSelector } from 'react-redux';
//导入reducer
import { changeCollapsedState } from '@/redux/CollapsedReducerSlice';
//导入icon
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
} from '@ant-design/icons';

const { Header } = Layout;

export default function TopHeader() {
    //获取redux中保存的状态和方法
    const dispatch = useDispatch();
    const { isCollapsed } = useSelector((state) => state.collApsedReducer);

    //改变图标的函数
    const changeCollapsed = () => {
        dispatch(changeCollapsedState());
    };
    const navigate = useNavigate();
    const {
        role: { roleName },
        username,
    } = JSON.parse(localStorage.getItem('token'));

    //定义下拉菜单的变量
    const menu = (
        <Menu>
            <Menu.Item>{roleName}</Menu.Item>
            <Menu.Item
                danger
                onClick={() => {
                    localStorage.removeItem('token');
                    navigate(`/login`);
                }}>
                退出
            </Menu.Item>
        </Menu>
    );
    return (
        <Header
            className='site-layout-background'
            style={{ padding: '16px  16px' }}>
            {isCollapsed ? (
                <MenuUnfoldOutlined onClick={changeCollapsed} />
            ) : (
                <MenuFoldOutlined onClick={changeCollapsed} />
            )}
            <div style={{ float: 'right' }}>
                <span style={{ margin: '0px 20px 30px 0px ' }}>
                    欢迎<span style={{ color: '#1890ff' }}>{username}</span>回来
                </span>

                <Dropdown overlay={menu}>
                    <Avatar
                        size={35}
                        icon={<UserOutlined />}
                        style={{ margin: '0px 20px 20px 0' }}
                    />
                </Dropdown>
            </div>
        </Header>
    );
}
