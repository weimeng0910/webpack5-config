import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

export default function NewsUpdate() {
    const [current, setCurrent] = useState(0);
    const [categoryList, setCategoryList] = useState([]);

    //设置表单的ref
    const NewsForm = useRef(null);
    //路由导航
    let navigate = useNavigate();
    //路由路径中使用useParams()
    let params = useParams();

    //保存文章标题和文章类型的值
    const [formInfo, setformInfo] = useState({});
    //表单组件向父组件传回来的值
    const [content, setContent] = useState('');

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

    //定义表单布局
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };
    //获取新闻分类的数据
    useEffect(() => {
        axios.get('/categories').then((res) => {
            setCategoryList(res.data);
        });
    }, []);

    //通过ID获取修改的新闻数据
    useEffect(() => {
        console.log(params.id);
        axios
            .get(`/news/${params.id}?_expand=category&_expand=role`)
            .then((res) => {
                //setnewsInfo(res.data);
                let { title, categoryId, content } = res.data;
                NewsForm.current.setFieldsValue({
                    title,
                    categoryId,
                });
                setContent(content);
            });
    }, [params.id]);

    //处理保存和草稿的方法
    const handleSeve = (auditState) => {
        axios
            .patch(`/news/${params.id}`, {
                //组装数据
                ...formInfo,
                content: content,
                auditState: auditState,
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
                title='修改新闻'
                onBack={() => navigate(-1)}
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
                        content={content}
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
