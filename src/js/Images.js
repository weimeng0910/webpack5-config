import '../css/img.css'

function packImg() {
  //01.创建容器
  const oEle = document.createElement('div');
  //02.创建img标签，设置src属性
  const oImg = document.createElement('img');
  oImg.src = require('../images/vue.jpg');
  oEle.appendChild(oImg);
  //设置背景图片
  const objImg = document.createElement('div')
  objImg.className = 'bgBox'
  oEle.appendChild(objImg);
  return oEle
  
};
document.body.appendChild(packImg());