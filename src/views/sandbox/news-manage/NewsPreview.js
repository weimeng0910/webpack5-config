import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageHeader, Descriptions } from 'antd';
import axios from 'axios';
import moment from 'moment';
export default function NewsPreview() {
    const [newsInfo, setnewsInfo] = useState(null);
    let params = useParams();
    useEffect(() => {
        console.log(params.id);
        axios
            .get(`/news/${params.id}?_expand=category&_expand=role`)
            .then((res) => {
                setnewsInfo(res.data);
            });
    }, [params.id]);

    //本地映射数组
    const auditList = ['未审核', '审核中', '已通过', '未通过'];
    const publishList = ['未发布', '待发布', '已上线', '已下线'];
    return (
        <div>
            {newsInfo && (
                <div>
                    <PageHeader
                        onBack={() => window.history.back()}
                        title={newsInfo.title}
                        subTitle={newsInfo.category.title}>
                        <Descriptions size='small' column={3}>
                            <Descriptions.Item label='创建者'>
                                {newsInfo.author}
                            </Descriptions.Item>
                            <Descriptions.Item label='创建时间'>
                                {moment(newsInfo.createTime).format(
                                    'YYYY/MM/DD HH:mm:ss'
                                )}
                            </Descriptions.Item>
                            <Descriptions.Item label='发布时间'>
                                {newsInfo.publishTime
                                    ? moment(newsInfo.publishTime).format(
                                          'YYYY/MM/DD HH:mm:ss'
                                      )
                                    : '-'}
                            </Descriptions.Item>
                            <Descriptions.Item label='区域'>
                                {newsInfo.region}
                            </Descriptions.Item>
                            <Descriptions.Item label='审核状态'>
                                <span style={{ color: 'red' }}>
                                    {auditList[newsInfo.auditState]}
                                </span>
                            </Descriptions.Item>
                            <Descriptions.Item label='发布状态'>
                                <span style={{ color: 'red' }}>
                                    {publishList[newsInfo.publishState]}
                                </span>
                            </Descriptions.Item>
                            <Descriptions.Item label='访问数量'>
                                {newsInfo.view}
                            </Descriptions.Item>
                            <Descriptions.Item label='点赞数量'>
                                {newsInfo.star}
                            </Descriptions.Item>
                            <Descriptions.Item label='评论数量'>
                                0
                            </Descriptions.Item>
                        </Descriptions>
                    </PageHeader>
                    <div
                        // dangerouslySetInnerHTML 是 React 为浏览器 DOM 提供 innerHTML 的替换方案。
                        //通常来讲，使用代码直接设置 HTML 存在风险，因为很容易无意中使用户暴露于跨站脚本（XSS）的攻击。
                        //因此，你可以直接在 React 中设置 HTML，但当你想设置 dangerouslySetInnerHTML 时，
                        //需要向其传递包含 key 为 __html 的对象
                        dangerouslySetInnerHTML={{
                            __html: newsInfo.content,
                        }}
                        style={{
                            margin: '0 24px',
                            padding: '0 10px',
                            border: '1px solid gray',
                        }}></div>
                </div>
            )}
        </div>
    );
}
