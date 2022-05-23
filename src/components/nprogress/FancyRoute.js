import React, { useEffect, Fragment } from 'react';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
//React 中的一个常见模式是一个组件返回多个元素。Fragments 允许你将子列表分组，而无需向 DOM 添加额外节点。
const NProgress = () => {
    useEffect(() => {
        nprogress.start();

        return () => {
            nprogress.done();
        };
    });

    return <Fragment />;
};

export default NProgress;
