import React from 'react';
import { Button } from 'antd';
import axios from 'axios';

const Home = () => {
  const ajax=() => {
    axios.get("http://localhost:8000/posts").then(res=>{
      console.log(res.data);
    })
   }
  return (
    <div>
      <Button type='primary' onClick={ajax}>button</Button>
    </div>
  );
}

export default Home;
