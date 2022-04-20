import React from 'react';
//引入antd
import { Layout} from 'antd';

//引入路由
import {
  Routes,
  Route,
  Navigate
  } from 'react-router-dom';

  //引入样式

import './NewsSandBox.css'

//引入左侧menu组件和top组件
import Sidemenu from '@/components/sandbox/SideMenu';
import TopHeader from '@/components/sandbox/TopHeader';
//引入二级组件
import Home from '../sandbox/home/Home';
import UserList from '../sandbox/user-manage/UserList';
import RightList from '../sandbox/right-manage/RightList';
import RoleList from '../sandbox/right-manage/RoleList';
import NotFound from '../sandbox/notfound/NotFound';



const { Content } = Layout;

export default function NewsSandBox() {

  return (

    <Layout>
        {/* 左侧菜单导航 */}
        <Sidemenu></Sidemenu>
        <Layout className="site-layout">
            {/* 顶部展示布局 */}
            <TopHeader></TopHeader>
            {/* 内容页面布局 */}
            <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
                <Routes>

                  <Route path = "home" element = { <Home/> }/>
                  <Route path = "user-manage/list" element = { <UserList/> }/>
                  <Route path = "right-manage/right/list" element = { <RightList/> }/>
                  <Route path = "right-manage/role/list" element = { <RoleList/> }/>
                  {/* router-v6下的定向方式 */}
                  {/* <Route path="*" element={<Navigate to="/home" />} /> */}
                  {/* 已经在V6中弃用 */}
                  {/* <Redirect to="/home" /> */}
                  {/* 如果进入二级页面后，路径只有"/"设置重定向页面 */}
                  <Route exact path="/" element = { <Navigate to = "/home" /> }/>
                  {/* 404页面 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
             </Content>
        </Layout>
    </Layout>
  )
}
