// 路線選項：使用者提供的 23 個區間與車站清單
const routes = [
  { id: '台東_枋寮', name: '台東到枋寮', stations: ['台東','康樂','知本','太麻里','金崙','瀧溪','大武','中央（號誌站）','枋野（號誌站）','枋山','內獅','加祿','枋寮'] },
  { id: '花蓮_玉里', name: '花蓮到玉里', stations: ['花蓮','吉安','志學','平和','壽豐','豐田','林榮新光','南平','鳳林','萬榮','光復','大富','富源','瑞穗','三民','玉里'] },
  { id: '玉里_台東', name: '玉里到台東', stations: ['東里','東竹','富里','池上','海端','關山','瑞源','瑞和','山里'] },
  { id: '蘇澳新_花蓮', name: '蘇澳新到花蓮', stations: ['蘇澳新','永樂','東澳','南澳','武塔','漢本','和平','和仁','崇德','新城（太魯閣）','景美','北埔'] },
  { id: '枋寮_潮州', name: '枋寮到潮州', stations: ['東海','佳冬','林邊','鎮安','南州','崁頂','潮州'] },
  { id: '潮州_新左營', name: '潮州到新左營', stations: ['竹田','西勢','麟洛','歸來','屏東','六塊厝','九曲堂','後庄','鳳山','正義','科工館','民族','高雄','三塊厝','鼓山','美術館','內惟','左營（舊城）','新左營'] },
  { id: '新左營_台南', name: '新左營到台南', stations: ['楠梓','橋頭','岡山','路竹','大湖','中洲','仁德','保安','南臺南','林森','台南'] },
  { id: '台南_嘉義', name: '台南到嘉義', stations: ['大橋','永康','新市','南科','善化','拔林','隆田','林鳳營','柳營','新營','後壁','南靖','水上','北回歸線（號誌站）','嘉義'] },
  { id: '嘉義_彰化', name: '嘉義到彰化', stations: ['嘉北','民雄','大林','石龜','斗南','斗六','石榴','林內','二水','田中','社頭','永靖','員林','大村','花壇','彰化'] },
  { id: '彰化經海線_竹南', name: '彰化經海線到竹南', stations: ['追分','大肚','龍井','沙鹿','清水','台中港','大甲','日南','苑裡','通霄','新埔','白沙屯','龍港','後龍','大山','談文','談文南（號誌站）','崎頂','竹南'] },
  { id: '彰化經山線_竹南', name: '彰化經山線到竹南', stations: ['大肚溪南（號誌站）','成功','新烏日','烏日','大慶','五權','台中','精武','太原','松竹','頭家厝','潭子','栗林','豐原','后里','泰安','三義','銅鑼','南勢','苗栗','豐富','造橋'] },
  { id: '竹南_桃園', name: '竹南到桃園', stations: ['香山','三姓橋','新竹','北新竹','竹北','新豐','湖口','北湖','新富','富岡','楊梅','埔心','中壢','內壢','桃園'] },
  { id: '桃園_基隆', name: '桃園到基隆', stations: ['鳳鳴（臨時站）','鶯歌','山佳','南樹林','樹林','浮洲','板橋','萬華','台北','松山','南港','汐科','汐止','五堵','七堵','八堵','三坑','基隆'] },
  { id: '八堵_貢寮', name: '八堵到貢寮', stations: ['暖暖','四腳亭','瑞芳','猴硐','三貂嶺','牡丹','雙溪','貢寮'] },
  { id: '貢寮_蘇澳', name: '貢寮到蘇澳', stations: ['福隆','石城','大里','大溪','外澳','頭城','頂埔','礁溪','四城','宜蘭','二結','中里','羅東','冬山','蘇澳新','新馬','蘇澳'] },
  { id: '中洲_沙崙', name: '中洲到沙崙', stations: ['長榮大學','沙崙'] },
  { id: '二水_車程', name: '二水到車程', stations: ['濁水','龍泉','集集','水里','車埕'] },
  { id: '台中港_港口', name: '台中港到港口', stations: ['台中港貨運中繼與貨場（純貨運）'] },
  { id: '竹東_內灣', name: '竹東到內灣', stations: ['橫山','九讚頭','合興','富貴','內灣'] },
  { id: '瑞芳_海科館', name: '瑞芳到海科館', stations: ['海科館','八斗子'] },
  { id: '大華_菁桐', name: '大華到菁桐', stations: ['大華','十分','望古','嶺腳','平溪','菁桐'] },
  { id: '千甲_六家', name: '千甲到六家', stations: ['千甲','新莊','竹中','上員','榮華','竹東','六家'] },
  { id: '北埔_花蓮港', name: '北埔到花蓮港', stations: ['花蓮港站（純貨運站）'] }
];

const spacing = 240; // 每個站之間的像素間隔（放大兩倍）
const trackContainer = document.getElementById('trackContainer');
const track = document.getElementById('track');
const routesEl = document.getElementById('routes');
const infoPanel = document.getElementById('infoPanel');
const inputName = document.getElementById('inputName');
const inputDesc = document.getElementById('inputDesc');
const inputFile = document.getElementById('inputFile');
const preview = document.getElementById('preview');
const saveBtn = document.getElementById('savePoint');
const deleteBtn = document.getElementById('deletePoint');
const closeBtn = document.getElementById('closePanel');
const pointTitle = document.getElementById('pointTitle');

// TODO: 這裡填入你部署後的 Apps Script 網頁應用程式 URL
const GAS_URL = 'https://script.google.com/macros/s/AKfycbwoWYLH0iJp4NFYyveZpVr4QWwBaywEKo4o8J5xeUEcrj3aJaVBvqTlsyzCm6DdWmAgTg/exec';

let currentRoute = null;
let currentPointId = null;
let store = loadStore();

function loadStore(){
  try{
    return JSON.parse(localStorage.getItem('photoPoints_v1')||'{}');
  }catch(e){return{}}
}

function saveStore(){
  localStorage.setItem('photoPoints_v1', JSON.stringify(store));
}

function init(){
  // 建立路線按鈕
  routes.forEach(r=>{
    const btn = document.createElement('button');
    btn.textContent = r.name;
    btn.addEventListener('click', ()=>selectRoute(r.id));
    routesEl.appendChild(btn);
  });
  // 預設選第一條
  selectRoute(routes[0].id);

  // 監聽在 trackContainer 上的點擊（新增攝影點）
  trackContainer.addEventListener('click', onTrackClick);

  // 表單事件
  saveBtn.addEventListener('click', onSave);
  deleteBtn.addEventListener('click', onDelete);
  closeBtn.addEventListener('click', ()=>hidePanel());
  inputFile.addEventListener('change', onFileChange);
}

function selectRoute(routeId){
  currentRoute = routes.find(r=>r.id===routeId);
  // 標示按鈕
  Array.from(routesEl.children).forEach(b=>b.classList.toggle('active', b.textContent===currentRoute.name));
  renderTrack();
}

function renderTrack(){
  // 清除軌道內容
  track.innerHTML = '';
  // 計算高
  const h = Math.max(800, currentRoute.stations.length*spacing + 200);
  track.style.height = h + 'px';

  // 加入車站標記
  currentRoute.stations.forEach((name, i)=>{
    const y = 50 + i*spacing;
    const el = document.createElement('div');
    el.className = 'station';
    el.style.top = y + 'px';
    el.innerHTML = `<div class="dot"></div><div class="label">${name}</div>`;
    track.appendChild(el);
  });

  // 渲染已有攝影點
  renderPointsForCurrentRoute();
}

function renderPointsForCurrentRoute(){
  // remove existing photo-point elements
  Array.from(track.querySelectorAll('.photo-point')).forEach(n=>n.remove());
  const points = (store[currentRoute.id]||[]);
  points.forEach(p=>{
    const el = createPointElement(p);
    track.appendChild(el);
  });
}

function createPointElement(p){
  const el = document.createElement('div');
  el.className = 'photo-point';
  el.style.top = (p.top - 7) + 'px';
  el.dataset.id = p.id;
  el.addEventListener('click', (ev)=>{
    ev.stopPropagation();
    openPoint(p.id);
  });
  return el;
}

function onTrackClick(ev){
  // 如果點擊的是點或站，這裡會被 stopPropagation
  const rect = track.getBoundingClientRect();
  const containerRect = trackContainer.getBoundingClientRect();
  const scrollTop = trackContainer.scrollTop;
  // 計算在 track 內的 Y
  const y = ev.clientY - containerRect.top + scrollTop;
  // 限制範圍
  const top = Math.max(10, Math.min(y, track.offsetHeight-10));
  const point = { id: Date.now().toString(), top, name:'', desc:'', img:null };
  store[currentRoute.id] = store[currentRoute.id]||[];
  store[currentRoute.id].push(point);
  saveStore();
  const el = createPointElement(point);
  track.appendChild(el);
  // 打開編輯面板
  openPoint(point.id);
}

function openPoint(id){
  currentPointId = id;
  const points = store[currentRoute.id]||[];
  const p = points.find(x=>x.id===id);
  if(!p) return;
  pointTitle.textContent = `攝影點 - ${currentRoute.name}`;
  inputName.value = p.name||'';
  inputDesc.value = p.desc||'';
  preview.innerHTML = '';
  if(p.img){
    const img = document.createElement('img'); img.src = p.img; preview.appendChild(img);
  }
  infoPanel.classList.remove('hidden');
}

function hidePanel(){
  currentPointId = null;
  infoPanel.classList.add('hidden');
}

function onSave(){
  if(!currentPointId) return;
  const points = store[currentRoute.id]||[];
  const p = points.find(x=>x.id===currentPointId);
  if(!p) return;
  p.name = inputName.value;
  p.desc = inputDesc.value;
  saveStore();
  sendPointToGAS(p);
  hidePanel();
}

async function sendPointToGAS(point){
  if(!GAS_URL) return;
  const payload = {
    routeId: currentRoute.id,
    routeName: currentRoute.name,
    pointId: point.id,
    name: point.name,
    desc: point.desc,
    top: point.top,
    timestamp: new Date().toISOString()
  };

  try {
    const res = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if(!res.ok) console.error('GAS 送出失敗', res.status, res.statusText);
    else console.log('GAS 送出成功');
  } catch(error) {
    console.error('GAS 送出失敗', error);
  }
}

function onDelete(){
  if(!currentPointId) return;
  store[currentRoute.id] = (store[currentRoute.id]||[]).filter(x=>x.id!==currentPointId);
  saveStore();
  renderPointsForCurrentRoute();
  hidePanel();
}

function onFileChange(ev){
  const f = ev.target.files && ev.target.files[0];
  if(!f || !currentPointId) return;
  const reader = new FileReader();
  reader.onload = ()=>{
    const data = reader.result;
    // 儲存到 store
    const points = store[currentRoute.id]||[];
    const p = points.find(x=>x.id===currentPointId);
    if(!p) return;
    p.img = data;
    saveStore();
    // 顯示預覽
    preview.innerHTML = '';
    const img = document.createElement('img'); img.src = data; preview.appendChild(img);
  };
  reader.readAsDataURL(f);
}

// 初始化
init();
