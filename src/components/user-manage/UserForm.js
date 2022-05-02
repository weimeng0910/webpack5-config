import React, { useRef, forwardRef, useImperativeHandle } from 'react';
//导入antd组件
import { Form, Input, Select } from 'antd';

const { Option } = Select;

const UserForm = forwardRef((props, ref) => {
    const formRef = useRef(null);
    // 作用: 减少父组件获取的DOM元素属性,只暴露给父组件需要用到的DOM方法
    // 参数1: 父组件传递的ref属性
    // 参数2: 返回一个对象,父组件通过ref.current调用对象中方法

    useImperativeHandle(
        ref,
        () => ({
            validateFields: () => formRef.current.validateFields(),
        }),
        [formRef]
    );
    // console.log(props, ref);
    const { roleList, regionList } = props;
    return (
        <Form ref={formRef} layout='vertical'>
            <Form.Item label='用户名'>
                <Form.Item
                    name='username'
                    // 校验
                    rules={[
                        {
                            required: true,
                            message: 'Please input the title of collection!',
                        },
                    ]}>
                    <Input />
                </Form.Item>
            </Form.Item>
            <Form.Item label='密码'>
                <Form.Item
                    name='password'
                    // 校验
                    rules={[
                        {
                            required: true,
                            message: 'Please input the title of collection!',
                        },
                    ]}>
                    <Input />
                </Form.Item>
            </Form.Item>
            <Form.Item label='区域'>
                <Form.Item
                    name='region'
                    // 校验
                    rules={[
                        {
                            required: true,
                            message: 'Please input the title of collection!',
                        },
                    ]}>
                    <Select style={{ width: 120 }}>
                        {regionList.map((item) => (
                            <Option value={item.value} key={item.id}>
                                {item.title}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form.Item>
            <Form.Item label='角色'>
                <Form.Item
                    name='roleId'
                    // 校验
                    rules={[
                        {
                            required: true,
                            message: 'Please input the title of collection!',
                        },
                    ]}>
                    <Select style={{ width: 120 }}>
                        {roleList.map((item) => (
                            <Option value={item.id} key={item.id}>
                                {item.roleName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form.Item>
        </Form>
    );
});
UserForm.displayName = 'UserForm';
export default UserForm;
