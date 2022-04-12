import '../fonts/style.css'

function packFont() {
  const oEle = document.createElement('div');
  const oSpan=document.createElement('span');
  oSpan.className='icomoon icon-anaconda meng-icon';
  oEle.appendChild(oSpan);

      return oEle;
  
};
console.log('font444');
document.body.appendChild(packFont());

