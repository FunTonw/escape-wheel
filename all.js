const wheel = document.querySelector("#wheel")
const iconGroup = document.querySelector(".icon-group");
const iconSingle = document.querySelectorAll(".icon-group>li");
const btn_presents = document.querySelector("#btn-presents");
const btn_envelopes = document.querySelector("#btn-envelopes");
const btn_reset = document.querySelector("#btn-reset");

const pointer = document.querySelector('.pointer');
const btn_press = document.querySelector('#btn-press');

const banner =  document.querySelector('#banner');

let data = [];
let game = null;
let type;
const types = {
  presents:{
   playTimes:10,
    data:[
  {
    "label": "Flight",
    "icon": "fas fa-fighter-jet",
    "num": 1
  },
  {
    "label": "Coffee",
    "icon": "fas fa-mug-hot",
    "num": 2
  },
  {
    "label": "Anything",
    "icon": "fas fa-star",
    "num": 1
  },
  {
    "label": "Sick Leave",
    "icon": "fas fa-hand-holding-medical",
    "num": 1
  },
  {
    "label": "Movie",
    "icon": "fas fa-film",
    "num": 2
  },
  {
    "label": "Wifi",
    "icon": "fas fa-wifi",
    "num": 1
  },
  {
    "label": "Break",
    "icon": "far fa-clock",
    "num": 1
  },
  {
    "label": "Bonus",
    "icon": "fas fa-coins",
    "num": 1
  }
]

  },
  envelopes:{
    playTimes:25,
    data:[
  {
    "label":"1",
    "num": 1
  },
  {
    "label":"2",
    "num": 1
  },
  {
    "label":"3",
    "num": 1
  },
  {
    "label":"4",
    "num": 1
  },
  {
    "label":"5",
    "num": 2
  },
  {
    "label":"6",
    "num": 1
  },
  {
    "label":"7",
    "num": 1
  },
  {
    "label":"8",
    "num": 1
  },
  {
    "label":"9",
    "num": 2
  },
  {
    "label":"10",
    "num": 1
  },
  {
    "label":"11",
    "num": 2
  },
  {
    "label":"12",
    "num": 1
  },
  {
    "label":"13",
    "num": 1
  },
  {
    "label":"14",
    "num": 1
  },
  {
    "label":"15",
    "num": 1
  },
  {
    "label":"16",
    "num": 1
  },
  {
    "label":"17",
    "num": 1
  },
  {
    "label":"18",
    "num": 1
  },
  {
    "label":"19",
    "num": 1
  },
  {
    "label":"20",
    "num": 3
  }
]
  }
};
const colors = {
  blue: "#343BAA",
  blueDark:"#1F1172",
  pinkLight:" #F0BEFF",
  pink:"#FF00BA"
};

// init canvas setting
const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const radius = 270; // wheel radius
const PI2 = Math.PI*2;
canvas.width = radius * 2;
canvas.height = radius * 2;

// draw sectors
ctx.fillPie = function(x,y,r,start,qty){
  let angle = PI2 / qty;
  this.beginPath()
  ctx.lineTo(radius, radius)
  this.arc(x,y,r,start*angle,(start+1)*angle)
  ctx.lineTo(radius,radius)
  this.fill()
  this.closePath()
};

function insertContent(data,qty,type){
  let rotate = 360 / qty
  iconGroup.innerHTML = ''
    data.forEach((item,index)=>{
      let html = ''
      if(type == 'presents'){
        html = `
        <i class="icon ${item.icon}"></i>
        <h5>${item.label}</h5>
        <span class="present-qty">${item.num}</span>
        `
      }else{
        html = `
        <h5>${item.label}</h5>
        <span class="present-qty">${item.num}</span>`
      }
      let newContent = document.createElement("li")
      newContent.innerHTML = html
      iconGroup.append(newContent)

      newContent.style.transform = `rotate(${index*rotate}deg)`
    })
};

function drawButton(){
  ctx.beginPath();
  ctx.fillStyle = colors.blueDark;
  ctx.arc(radius,radius,55,0,PI2);
  ctx.closePath();
  ctx.fill();
}

function drawSectors(qty){
  for(let i = 0 ; i<=qty ; i+=2){
    ctx.fillStyle = colors.pinkLight;
    ctx.fillPie(radius,radius,radius,i,qty);
  }
  for(let i = 1 ; i<=qty ; i+=2){
    ctx.fillStyle = colors.blue;
    ctx.fillPie(radius,radius,radius,i,qty);
  }
}

// 圓畫出來
function draw(data,qty,type){
  drawSectors(qty)
    drawButton();
    insertContent(data,qty,type);
};

function init(btn){
  type = btn.value
  draw(types[type].data, types[type].data.length, type)

  //切換時 畫面校正回歸
  pointer.style.transition = `unset`;
  pointer.style.transform = `rotate(0deg)`;
  banner.innerHTML = ``;
  banner.classList.remove('banner');
};
init(btn_presents);

btn_presents.addEventListener("click",()=>{
  init(btn_presents);
  wheel.classList.remove("new");
  iconGroup.classList.remove("new");
});

btn_envelopes.addEventListener('click',()=>{
  init(btn_envelopes);
  wheel.classList.add("new");
  iconGroup.classList.add("new");
})

// control press btn


let degrees = 0;

btn_press.addEventListener('click', press);
function press() {
  noTime(type)
  start();
  setTimeout(()=>{
    stop(type, types[type].data.length);
  }, 3000)
}
function start() {
  bannerdraw(true);
  pointer.style.transition = `unset`
  // 自動旋轉
  runner = setInterval(function() {
    degrees = (degrees >= 360) ?  30 : degrees += 30;
    pointer.style.transform = `rotate(${degrees}deg)`;
  }, 30)
}
function stop(type, qty) {
  let rotate = 360 / qty;
  //求隨機數為data的陣列數
  let indexMath = Math.floor(Math.random()*qty);
  // 判斷陣列數內的num是否>=1
  if (types[type].data[indexMath].num >= 1) {

    types[type].data[indexMath].num --;
    types[type].playTimes --;

    //求得此陣列數 停止的角度
    let pricedeg =  rotate * indexMath;

    //這邊 角度判斷為了使動畫流暢
    degrees = (pricedeg === degrees) ? degrees += 360 :
    (pricedeg <= degrees) ? degrees += pricedeg + 360 - degrees :
    360 + pricedeg;

    //pointer帶入style
    pointer.style.transition = `all 1500ms linear`
    pointer.style.transform = `rotate(${degrees}deg)`;

    //停止自動旋轉
    clearInterval(runner);
    
    //重新繪圖
    setTimeout(()=> {
      draw(types[type].data, types[type].data.length, type)
      bannerdraw(false, types[type].playTimes ,types[type].data[indexMath]) 
    }, 1500);
  } else{
    // 若隨機數為0時, 再重新求隨機數
    stop(type, qty);
  }
}
//按鈕要在沒有次數的時候, 無法使用
function noTime(type) {
  if(types[type].playTimes <= 1){
    btn_press.removeEventListener('click', press);
  }
}
//reset按鈕
btn_reset.addEventListener('click', function() {
  window.location.reload(); 
})


//banner

function bannerdraw(startstop, datatime, data) {
  if (!startstop) {
    banner.classList.add('banner');
    let str =`<h2 class="info-text">Well Done!</h2>
    <div class="info-result">
      <h3>No.${datatime + 1}</h3>
      <span>you got...</span>
      <span id="selected-present">${data.label}</span>`;
    banner.innerHTML = str;
  } else {
    banner.classList.remove('banner');
    banner.innerHTML = '';
  }
}