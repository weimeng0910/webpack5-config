//钩子函数来实再Router v5 中 { withRouter }
//目的：实现命令式跳转，V5：history.push(‘xxxx’)在v6下的跳转
import React from 'react';
import {

  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";

export default function withRouter(Component) {

  function ComponentWithRouterProp(props) {

    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    return (
      <Component
        {...props}
        router={
    {
     location, navigate, params }}
      />
    );
  }
  return ComponentWithRouterProp;
}

