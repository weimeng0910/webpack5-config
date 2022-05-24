import React, { useEffect, useState, Suspense } from 'react';
//引入路由
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

//导入导航条组件
import FancyRoute from '@/components/nprogress/FancyRoute';

//引入二级组件,组件是动态加载的，在Network的All中点击路由组件的才会加载，不点不加载，这样才会产生导航条的动画
//Suspense 使得组件可以“等待”某些操作结束后，再进行渲染。目前，Suspense 仅支持的使用场景是：通过 React.lazy 动态加载组件。
const Home = React.lazy(() => import('@/views/sandbox/home/Home'));

const UserList = React.lazy(() =>
    import('@/views/sandbox/user-manage/UserList')
);

const RightList = React.lazy(() =>
    import('@/views/sandbox/right-manage/RightList')
);

const RoleList = React.lazy(() =>
    import('@/views/sandbox/right-manage/RoleList')
);

const NotFound = React.lazy(() => import('@/views/sandbox/notfound/NotFound'));

const NewsAdd = React.lazy(() => import('@/views/sandbox/news-manage/NewsAdd'));

const NewsDraft = React.lazy(() =>
    import('@/views/sandbox/news-manage/NewsDraft')
);

const NewsCategory = React.lazy(() =>
    import('@/views/sandbox/news-manage/NewsCategory')
);

const Audit = React.lazy(() => import('@/views/sandbox/audit-manage/Audit'));

const AuditList = React.lazy(() =>
    import('@/views/sandbox/audit-manage/AuditList')
);

const Unpublished = React.lazy(() =>
    import('@/views/sandbox/publish-manage/Unpublished')
);

const Published = React.lazy(() =>
    import('@/views/sandbox/publish-manage/Published')
);

const Sunset = React.lazy(() =>
    import('@/views/sandbox/publish-manage/Sunset')
);

//创建本地映射表
const LocalRouterMap = {
    '/home': <Home />,
    '/user-manage/list': <UserList />,
    '/right-manage/role/list': <RoleList />,
    '/right-manage/right/list': <RightList />,
    '/news-manage/add': <NewsAdd />,
    '/news-manage/draft': <NewsDraft />,
    '/news-manage/category': <NewsCategory />,
    '/audit-manage/audit': <Audit />,
    '/audit-manage/list': <AuditList />,
    '/publish-manage/unpublished': <Unpublished />,
    '/publish-manage/published': <Published />,
    '/publish-manage/sunset': <Sunset />,
};

export default function NewsRouter() {
    //设置路由数据列表状态
    const [BackRouteList, setBackRouteList] = useState([]);

    //获取数据
    useEffect(() => {
        Promise.all([axios.get('/rights'), axios.get('/children')]).then(
            (res) => {
                //console.log(res[0].data);
                setBackRouteList([...res[0].data, ...res[1].data]);
            }
        );
    }, []);
    //获取登陆令牌的权限
    const {
        role: { rights },
    } = JSON.parse(localStorage.getItem('token'));
    //检查本地映射是存在路径并且检查权限开关是否开启
    const checkRoute = (item) => {
        return LocalRouterMap[item.key] && item.pagepermisson;
    };
    //检查当前用户登陆权限
    const checkUserPermission = (item) => {
        return rights.includes(item.key);
    };
    return (
        <div>
            {/* 显示 <FancyRoute> 组件直至 Route 加载完成，然后应在 Suspense 组件中渲染 lazy 组件，
            如此使得我们可以使用在等待加载 lazy 组件时做优雅降级（如 loading 指示器等）。
              fallback 属性接受任何在组件加载过程中你想展示的 React 元素。
              你可以将 Suspense 组件置于懒加载组件之上的任何位置。
              你甚至可以用一个 Suspense 组件包裹多个懒加载组件。
            */}
            <Suspense fallback={<FancyRoute />}>
                <Routes>
                    {BackRouteList.map((item) => {
                        if (checkRoute(item) && checkUserPermission(item)) {
                            return (
                                <Route
                                    path={item.key}
                                    key={item.key}
                                    element={LocalRouterMap[item.key]}
                                    exact={true}
                                />
                            );
                        }
                        return null;
                    })}

                    <Route exact path='/' element={<Navigate to='/home' />} />
                    {/* 404页面 */}
                    {BackRouteList.length > 0 && (
                        <Route path='*' element={<NotFound />} />
                    )}
                </Routes>
            </Suspense>
        </div>
    );
}
