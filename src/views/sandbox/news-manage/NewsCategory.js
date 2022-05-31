import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

//解构confirm
const { confirm } = Modal;

//创建上下文对象,用来保存全局的对象，可以传入子组件中使用
const EditableContext = React.createContext(null);

//组件 NewsCategory
const NewsCategory = () => {
    //角色列表显示的数据状态
    const [dataSource, setDataSource] = useState([]);

    //获取角色列表的数据
    useEffect(() => {
        axios.get('/categories').then((res) => {
            setDataSource(res.data);
        });
    }, []);

    //处理表单对象的函数
    const handleSave = (record) => {
        setDataSource(
            dataSource.map((item) => {
                if (item.id === record.id) {
                    return {
                        id: item.id,
                        title: record.title,
                        value: record.title,
                    };
                }
                return item;
            })
        );

        axios.patch(`/categories/${record.id}`, {
            title: record.title,
            value: record.title,
        });
    };
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => {
                return <b>{id}</b>;
            },
        },
        {
            title: '栏目名称',
            dataIndex: 'title',
            render: (title) => {
                return <b style={{ color: '#3eaf7c' }}>{title}</b>;
            },
            onCell: (record) => ({
                record,
                editable: true,
                dataIndex: 'title',
                title: '栏目名称',
                handleSave: handleSave,
            }),
        },
        {
            title: '操作',

            render: (item) => {
                return (
                    <div>
                        <Button
                            onClick={() => removeConfirm(item)}
                            danger
                            shape='circle'
                            icon={<DeleteOutlined />}></Button>
                    </div>
                );
            },
        },
    ];

    //删除处理函数
    const removeConfirm = (item) => {
        confirm({
            title: '你确定要删除?',
            icon: <ExclamationCircleOutlined />,
            // content: 'Some descriptions',
            onOk() {
                // console.log('OK');
                deleteMethod(item);
            },
            onCancel() {
                //   console.log('Cancel');
            },
        });
    };
    //删除
    const deleteMethod = (item) => {
        //console.log(item);
        setDataSource(dataSource.filter((data) => data.id !== item.id));
        axios.delete(`/categories/${item.id}`);
    };

    //把from传入回调
    const EditableRow = ({ ...props }) => {
        const [form] = Form.useForm();
        return (
            <Form form={form} component={false}>
                <EditableContext.Provider value={form}>
                    <tr {...props} />
                </EditableContext.Provider>
            </Form>
        );
    };

    //
    const EditableCell = ({
        title,
        editable,
        children,
        dataIndex,
        record,
        handleSave,
        ...restProps
    }) => {
        const [editing, setEditing] = useState(false);

        const inputRef = useRef(null);

        const form = useContext(EditableContext);

        useEffect(() => {
            if (editing) {
                inputRef.current.focus();
            }
        }, [editing]);

        const toggleEdit = () => {
            setEditing(!editing);
            form.setFieldsValue({
                [dataIndex]: record[dataIndex],
            });
        };

        const save = async () => {
            try {
                const values = await form.validateFields();
                toggleEdit();
                handleSave({ ...record, ...values });
            } catch (errInfo) {
                console.log('Save failed:', errInfo);
            }
        };

        let childNode = children;

        if (editable) {
            childNode = editing ? (
                <Form.Item
                    style={{
                        margin: 0,
                    }}
                    name={dataIndex}
                    rules={[
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ]}>
                    <Input ref={inputRef} onPressEnter={save} onBlur={save} />
                </Form.Item>
            ) : (
                <div
                    className='editable-cell-value-wrap'
                    style={{
                        paddingRight: 24,
                    }}
                    onClick={toggleEdit}>
                    {children}
                </div>
            );
        }

        return <td {...restProps}>{childNode}</td>;
    };

    //定义覆盖table元素的对象，此对象包含两个函数
    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    return (
        <>
            <Table
                dataSource={dataSource}
                columns={columns}
                //分页
                pagination={{
                    pageSize: 5,
                }}
                //给遍历的每一项分配key值唯一
                rowKey={(item) => item.id}
                //覆盖默认的 table 元素
                components={components}
            />
        </>
    );
};

export default NewsCategory;
