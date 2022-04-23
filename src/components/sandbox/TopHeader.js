import React,{useState} from 'react'

import { Layout,Dropdown, Menu,Avatar } from 'antd';

import {

  MenuUnfoldOutlined,

  MenuFoldOutlined,

  UserOutlined

} from '@ant-design/icons';

const { Header } = Layout;

export default function TopHeader() {

  const [collapsed,setCollapsed] = useState(false);

//改变图标的函数
  const changeCollapsed=() => {

      setCollapsed(!collapsed)
  };
//定义下拉菜单的变量
    const menu = (
      <Menu>
        <Menu.Item>
          超级管理员
        </Menu.Item>
        <Menu.Item danger>

        退出

        </Menu.Item>
      </Menu>
    );
  return (

    <Header className="site-layout-background" style={{ padding:'16px  16px' }}>
            {
            collapsed
              ?
              <MenuUnfoldOutlined onClick = { changeCollapsed }/>
              :
              <MenuFoldOutlined onClick = { changeCollapsed } />

            }
            <div style ={{float:'right'}}>

              <span style= {{margin:"0px 20px 30px 0px " }}>欢迎admin回来</span>

              <Dropdown overlay={menu}>
                  <Avatar size={35} icon={ < UserOutlined /> } style= {{margin:"0px 20px 20px 0" }}/>
              </Dropdown>

            </div>
    </Header>
  )
}