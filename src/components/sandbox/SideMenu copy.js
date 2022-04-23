import React,{ useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
} from '@ant-design/icons';
import axios from 'axios';
//引入css
import './style/SideMenu.css';


const { Sider } = Layout;

const { SubMenu } = Menu;

//模拟数组结构
const menuList=[
  {
    //用路由的路径作为key值，点完后跳到对应的组件（经验）
    key:'/home',
    title:'首页',
    icon:<UserOutlined/>
  },
  {
    //二级路径
    key:'/user-manage',
    title:'用户管理',
    icon:<VideoCameraOutlined/>,
    children:[
      {
        key:'/user-manage/list',
        title:'用户列表',
        icon:<UserOutlined/>
      }
    ]
  },
  {
    //二级路径
    key:'/right-manage',
    title:'权限管理',
    icon:<UploadOutlined/>,
    children:[
      {
        key:'/right-manage/role/list',
        title:'角色列表',
        icon:<UserOutlined/>
      },
      {
        key:'/right-manage/right/list',
        title:'权限列表',
        icon:<UserOutlined/>
      }
    ]
  }
]



const SideMenu = () => {
  //获取数据
  useEffect(() => {
    axios.get('http://localhost:5000/rights?_embed=children').then(ref=>{
      console.log(ref.data);
    })

  }, []);
  //编程方式导航（例如在表单提交之后），这个钩子会为您提供一个 API 来执行此操作
   const navigate = useNavigate();

  //创建处理数据函数
    const renderMenu =(menuList) => {//接收数据

      return menuList.map(item=>{
        if(item.children){
          return <SubMenu key={item.key} icon={ item.icon } title={item.title} >
            {
              //递归
            renderMenu(item.children)
            }
          </SubMenu>
        }
        return <Menu.Item key={item.key} icon={ item.icon } onClick={()=>{
          //此处的props取不到，需要一级一级传过来，可以用高阶组件来取得 withRouter
          // props.history.push(item.key)
           navigate(`${item.key}`)

        }} >{ item.title }</Menu.Item>
      })
    }
    //
    const selectkeys = []
  return (

    <Sider trigger={null} collapsible collapsed={false} >

          <div className="logo">News Systemyyu</div>

          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              {
                renderMenu(menuList)

              }
          </Menu>

        </Sider>
  );
}

export default SideMenu;

