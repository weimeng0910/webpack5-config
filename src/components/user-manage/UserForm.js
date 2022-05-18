import React, {
    useState,
    useRef,
    forwardRef,
    useImperativeHandle,
} from 'react';
//导入antd组件
import { Form, Input, Select } from 'antd';

const { Option } = Select;
//从localStorage检索对象来获取用户的登陆信息。
//从对角中解构出相应的字段
const { roleId, region } = JSON.parse(localStorage.getItem('token'));

// forward用于获取函数式组件DOM元素
const UserForm = forwardRef((props, ref) => {
    // console.log(ref);
    //使用Ref创建子组件的引用变量
    const formRef = useRef(null);
    //const [form] = Form.useForm();
    //设置禁用选项的状态
    const [isDisabled, setIsDisabled] = useState(false);

    //ImperativeHandle，他的作用是“勾住”子组件中的某个函数（方法）供父组件调用。
    // 作用: 减少父组件获取的DOM元素属性,只暴露给父组件需要用到的DOM方法
    // 参数1: 父组件传递的ref属性
    // 参数2: 返回一个对象,父组件通过ref.current调用对象中方法
    //第 3 个参数是函数的依赖。如果处理函数中的任何依赖项，可以设置没有任何依赖项的参数
    //通过使用ImperativeHandle函数，将函数封装成一个对象，并将该对象定义到父组件内部的ref中。

    useImperativeHandle(
        ref,

        () => {
            return {
                //子组件定义内部函数 validateFields充许父组件访问这个方法，开放给父组件
                //通过useImperativeHandle的Hook, 将父组件传入的ref和useImperativeHandle第二个参数返回的对象绑定到了一起
                validateFields: () => formRef.current.validateFields(),
                resetFields: () => formRef.current.resetFields(),
                setFieldsValue,
                setIsDisabled,
            };
        }
    );
    //重新封装setFieldsValue方法，开放给父组件
    const setFieldsValue = (v) => {
        formRef.current.setFieldsValue(v);
    };

    //将父组件传过来的数据从props中解构
    const { roleList, regionList } = props;

    //设置roleId的映射对象，因为roleId的value值是1，2，3在判断数据中使用此映射对象
    const roleObj = {
        1: 'superadmin',
        2: 'admin',
        3: 'editor',
    };
    //定义添加或更新功能的选择框是否禁用的函数
    const checkRegionDisabled = (item) => {
        //判断是否创建

        if (props.isUpdate) {
            //判断是否是超级管理员
            if (roleObj[roleId] === 'superadmin') {
                return false;
            } else {
                return true;
            }
        } else {
            if (roleObj[roleId] === 'superadmin') {
                return false;
            } else {
                return item.value !== region;
            }
        }
    };

    const checkRoleDisabled = (item) => {
        if (props.isUpdate) {
            if (roleObj[roleId] === 'superadmin') {
                return false;
            } else {
                return true;
            }
        } else {
            if (roleObj[roleId] === 'superadmin') {
                return false;
            } else {
                return roleObj[item.id] !== 'editor';
            }
        }
    };
    return (
        <Form ref={formRef} layout='vertical'>
            <Form.Item
                name='username'
                label='用户名'
                // 校验
                rules={[
                    {
                        required: true,
                        message: 'Please input the title of collection!',
                    },
                ]}>
                <Input />
            </Form.Item>

            <Form.Item
                name='password'
                label='密码'
                // 校验
                rules={[
                    {
                        required: true,
                        message: 'Please input the title of collection!',
                    },
                ]}>
                <Input />
            </Form.Item>

            <Form.Item
                name='region'
                label='区域'
                // 校验
                rules={
                    isDisabled
                        ? []
                        : [
                              {
                                  required: true,
                                  message:
                                      'Please input the title of collection!',
                              },
                          ]
                }>
                <Select disabled={isDisabled} style={{ width: 120 }}>
                    {regionList.map((item) => (
                        <Option
                            value={item.value}
                            key={item.id}
                            disabled={checkRegionDisabled(item)}>
                            {item.title}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                name='roleId'
                label='角色'
                // 校验
                rules={[
                    {
                        required: true,
                        message: 'Please input the title of collection!',
                    },
                ]}>
                <Select
                    onChange={(value) => {
                        if (value === 1) {
                            setIsDisabled(true);
                            //antd中setFieldsValue设置当前的form中正在输入的input值
                            formRef.current.setFieldsValue({
                                region: '全球 ',
                            });
                        } else {
                            setIsDisabled(false);
                        }
                    }}
                    style={{ width: 120 }}>
                    {roleList.map((item) => (
                        <Option
                            value={item.id}
                            key={item.id}
                            disabled={checkRoleDisabled(item)}>
                            {item.roleName}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
        </Form>
    );
});
UserForm.displayName = 'UserForm';
export default UserForm;
