import React from 'react';
//引入路由
import { Routes, Route, Navigate } from 'react-router-dom';

//引入二级组件
import Home from '@/views/sandbox/home/Home';
import UserList from '@/views/sandbox/user-manage/UserList';
import RightList from '@/views/sandbox/right-manage/RightList';
import RoleList from '@/views/sandbox/right-manage/RoleList';
import NotFound from '@/views/sandbox/notfound/NotFound';
import NewsAdd from '@/views/sandbox/news-manage/NewsAdd';
import NewsDraft from '@/views/sandbox/news-manage/NewsDraft';
import NewsCategory from '@/views/sandbox/news-manage/NewsCategory';
import Audit from '@/views/sandbox/audit-manage/Audit';
import AuditList from '@/views/sandbox/audit-manage/AuditList';
import Unpublished from '@/views/sandbox/publish-manage/Unpublished';
import Published from '@/views/sandbox/publish-manage/Published';
import Sunset from '@/views/sandbox/publish-manage/Sunset';
//创建本地映射表
const LocalRouterMap = {
    '/home': Home,
    '/user-manage/list': UserList,
    '/right-manage/role/list': RoleList,
    '/right-manage/right/list': RightList,
    '/news-manage/add': NewsAdd,
    '/news-manage/draft': NewsDraft,
    '/news-manage/category': NewsCategory,
    '/audit-manage/audit': Audit,
    '/audit-manage/list': AuditList,
    '/publish-manage/unpublished': Unpublished,
    '/publish-manage/published': Published,
    '/publish-manage/sunset': Sunset,
};

export default function NewsRouter() {
    return (
        <div>
            <Routes>
                {/* 添加index属性，可以达到二级页面重定向回首页功能 */}
                <Route path='home' element={<Home />} />
                <Route path='user-manage/list' element={<UserList />} />
                <Route path='right-manage/right/list' element={<RightList />} />
                <Route path='right-manage/role/list' element={<RoleList />} />
                {/* router-v6下的定向方式 */}
                {/* <Route path="*" element={<Navigate to="/home" />} /> */}
                {/* 已经在V6中弃用 */}
                {/* <Redirect to="/home" /> */}
                {/* 如果进入二级页面后，路径只有"/"设置重定向页面 */}
                <Route exact path='/' element={<Navigate to='/home' />} />
                {/* 404页面 */}
                <Route path='*' element={<NotFound />} />
            </Routes>
        </div>
    );
}
