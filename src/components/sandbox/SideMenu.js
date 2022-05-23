import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import axios from 'axios';
//引入css
import './style/SideMenu.css';

const { Sider } = Layout;

const { SubMenu } = Menu;

//创建图标列表数据
const iconList = {
    '/home': <UserOutlined />,
    '/user-manage': <VideoCameraOutlined />,
    '/user-manage/list': <VideoCameraOutlined />,
    '/right-manage': <UploadOutlined />,
    '/right-manage/role/list': <UploadOutlined />,
    '/right-manage/right/list': <UploadOutlined />,
    '/news-manage': <UploadOutlined />,
    '/news-manage/add': <UploadOutlined />,
    '/news-manage/draft': <UploadOutlined />,
    '/news-manage/category': <UploadOutlined />,
    '/audit-manage': <UploadOutlined />,
    '/audit-manage/audit': <UploadOutlined />,
    '/audit-manage/list': <UploadOutlined />,
    '/publish-manage': <UploadOutlined />,
    '/publish-manage/unpublished': <UploadOutlined />,
    '/publish-manage/published': <UploadOutlined />,
    '/publish-manage/sunset': <UploadOutlined />,
};

const SideMenu = () => {
    //创建状态来接收数据
    const [menu, setMenu] = useState([]);
    const {
        role: { rights },
    } = JSON.parse(localStorage.getItem('token'));
    //获取数据
    useEffect(() => {
        axios.get('/rights?_embed=children').then((ref) => {
            setMenu(ref.data);
        });
    }, []);

    //编程方式导航（例如在表单提交之后），这个钩子会为您提供一个 API 来执行此操作
    const navigate = useNavigate();
    //获取当前点击路径
    let location = useLocation();
    //  console.log(location.pathname);
    //将当前路径放入数组，从而保证menu菜单选中
    const menuSelectedKeys = [location.pathname];

    //将当前路径截取，从而保证menu菜单打开
    const menuOpenkeys = ['/' + location.pathname.split('/')[1]];

    //判断是否存在pagepermisson的函数，用来判断是否渲染或者访问
    const checkPagePermission = (item) => {
        return item.pagepermisson && rights.includes(item.key);
    };
    //创建处理数据函数
    const renderMenu = (menuList) => {
        //接收数据

        return menuList.map((item) => {
            // 如果为假后面长度判断不执行
            if (item.children?.length && checkPagePermission(item)) {
                return (
                    <SubMenu
                        key={item.key}
                        icon={iconList[item.key]}
                        title={item.title}>
                        {
                            //递归
                            renderMenu(item.children)
                        }
                    </SubMenu>
                );
            }
            return (
                checkPagePermission(item) && (
                    <Menu.Item
                        key={item.key}
                        icon={iconList[item.key]}
                        onClick={() => {
                            navigate(`${item.key}`);
                        }}>
                        {item.title}
                    </Menu.Item>
                )
            );
        });
    };
    return (
        <Sider trigger={null} collapsible collapsed={false}>
            <div
                style={{
                    display: 'flex',
                    height: '100%',
                    flexDirection: 'column',
                }}>
                <div className='logo'>News System</div>

                <div style={{ flex: 1, overflow: 'auto' }}>
                    <Menu
                        theme='dark'
                        mode='inline'
                        selectedKeys={menuSelectedKeys}
                        defaultOpenKeys={menuOpenkeys}>
                        {renderMenu(menu)}
                    </Menu>
                </div>
            </div>
        </Sider>
    );
};

export default SideMenu;
