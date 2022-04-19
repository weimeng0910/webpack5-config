import React from 'react';

import {
  HashRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Login from '../views/login/Login';
import NewsSandBox from '../views/sandbox/NewsSandBox';
export default function IndexRouter() {
  return (
    <HashRouter>
      <Routes>
      <Route path="login" element = {<Login />} />
      {/* 查看有没有令牌，没有令牌则返回登陆页 因为有子路由所以 path="*"  */}
      <Route
      path="*"
      element = {
        localStorage.getItem('token')
         ?
        <NewsSandBox/>
        :
        <Navigate to="/login" />

        }/>

      </Routes>
    </HashRouter>
  )
}
