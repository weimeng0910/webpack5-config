import React, {useState} from "react";
import { BrowserRouter,Routes,Link,Route}from 'react-router-dom';
import Home from "@/components/Home";
import About from "@/components/About";
 function App() {
  // 声明一个叫 "count" 的 state 变量
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <BrowserRouter>
      <Link to="/home">首页</Link>
      <Link to="/about">关于</Link>
      <Routes>
        
        
        <Route path='home' element={<Home/>}></Route>
        <Route path='/about' element={<About />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;