import React from 'react';
//引入antd
import { Layout } from 'antd';

//引入样式
import './NewsSandBox.css';
// //引入导航条
// import NProgress from 'nprogress';
// import 'nprogress/nprogress.css';
//引入左侧menu组件和top组件
import Sidemenu from '@/components/sandbox/SideMenu';
import TopHeader from '@/components/sandbox/TopHeader';
import NewsRouter from '@/components/sandbox/NewsRouter';

const { Content } = Layout;

export default function NewsSandBox() {
    // NProgress.start();
    // useEffect(() => {
    //     NProgress.done();
    // });
    return (
        <Layout>
            {/* 左侧菜单导航 */}
            <Sidemenu></Sidemenu>
            <Layout className='site-layout'>
                {/* 顶部展示布局 */}
                <TopHeader></TopHeader>
                {/* 内容页面布局 */}
                <Content
                    className='site-layout-background'
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        overflow: 'auto',
                    }}>
                    <NewsRouter></NewsRouter>
                </Content>
            </Layout>
        </Layout>
    );
}
