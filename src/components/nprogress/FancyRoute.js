import { useEffect } from 'react';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

const NProgress = () => {
    useEffect(() => {
        nprogress.start();

        return () => {
            nprogress.done();
        };
    });

    return '';
};

export default NProgress;
