import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    PageHeader,
    Steps,
    Button,
    Form,
    Input,
    Select,
    message,
    notification,
} from 'antd';
import style from './News.module.css';
import './NewsAddIndex.css';
import axios from 'axios';
import NewsEditor from '@/components/news-manage/NewsEditor';
const { Step } = Steps;
const { Option } = Select;

export default function NewsAdd() {
    const [current, setCurrent] = useState(0);
    const [categoryList, setCategoryList] = useState([]);
    let navigate = useNavigate();
    //保存文章标题和文章类型的值
    const [formInfo, setformInfo] = useState({});
    //表单组件向父组件传回来的值
    const [content, setContent] = useState('');

    //获取令牌中的用户数据
    const User = JSON.parse(localStorage.getItem('token'));

    //下一步的按钮方法
    const handleNext = () => {
        if (current === 0) {
            NewsForm.current
                .validateFields()
                .then((res) => {
                    //console.log(res);
                    setformInfo(res);
                    setCurrent(current + 1);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            if (content === '' || content.trim() === '<p></p>') {
                message.error('新闻内容不能为空');
            } else {
                setCurrent(current + 1);
            }
        }
    };
    //上一步按钮处理函数
    const handlePrevious = () => {
        setCurrent(current - 1);
    };

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };

    const NewsForm = useRef(null);

    useEffect(() => {
        axios.get('/categories').then((res) => {
            // console.log(res.data)
            setCategoryList(res.data);
        });
    }, []);
    //处理保存和草稿的方法
    const handleSeve = (auditState) => {
        axios
            .post('/news', {
                //组装数据
                ...formInfo,
                content: content,
                region: User.region ? User.region : '全球',
                author: User.username,
                roleId: User.roleId,
                auditState: auditState,
                publishState: 0,
                createTime: Date.now(),
                star: 0,
                view: 0,
                // "publishTime": 0
            })
            .then(() => {
                //navigate替代了props.history.push
                navigate(
                    auditState === 0
                        ? '/news-manage/draft'
                        : '/audit-manage/list'
                );

                notification.info({
                    message: `通知`,
                    description: `您可以到${
                        auditState === 0 ? '草稿箱' : '审核列表'
                    }中查看您的新闻`,
                    placement: 'bottomRight',
                });
            });
    };
    return (
        <div>
            <PageHeader
                className='site-page-header'
                title='撰写新闻'
                subTitle='This is a subtitle'
            />
            <div>
                <Steps current={current}>
                    <Step
                        title={
                            <div
                                style={{
                                    marginTop: 10,
                                    fontSize: 16,
                                    color: 'rgba(0, 0, 0, 0.85)',
                                }}>
                                <p>基本信息</p>
                            </div>
                        }
                        description={
                            <div
                                style={{
                                    fontSize: 14,
                                    color: 'rgba(0, 0, 0, 0.85)',
                                }}>
                                <p>新闻标题 新闻分类</p>
                            </div>
                        }
                    />

                    <Step title='新闻内容' description='新闻主体内容' />
                    <Step title='新闻提交' description='保存草稿或者提交审核' />
                </Steps>
            </div>
            <div style={{ marginTop: '50px' }}>
                <div className={current === 0 ? '' : style.active}>
                    <Form {...layout} name='basic' ref={NewsForm}>
                        <Form.Item
                            label='新闻标题'
                            name='title'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label='新闻分类'
                            name='categoryId'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}>
                            <Select>
                                {categoryList.map((item) => (
                                    <Option value={item.id} key={item.id}>
                                        {item.title}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                </div>

                <div
                    style={{ height: '200px' }}
                    className={current === 1 ? '' : style.active}>
                    <NewsEditor
                        getContent={(value) => {
                            //console.log(value);
                            setContent(value);
                        }}
                    />
                </div>
                <div className={current === 2 ? '' : style.active}></div>
            </div>
            <div style={{ marginTop: '150px' }}>
                {current === 2 && (
                    <span>
                        <Button type='primary' onClick={() => handleSeve(0)}>
                            保存草稿箱
                        </Button>
                        <Button danger onClick={() => handleSeve(1)}>
                            提交审核
                        </Button>
                    </span>
                )}
                {current < 2 && (
                    <Button type='primary' onClick={handleNext}>
                        下一步
                    </Button>
                )}
                {current > 0 && (
                    <Button onClick={handlePrevious}>上一步</Button>
                )}
            </div>
        </div>
    );
}
