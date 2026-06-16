# 前端與 Google Apps Script (GAS) 整合說明

## 1. 前端：HTML + 原生 JavaScript

### 目標
在管理者點擊「儲存攝影點」後，將攝影點資料送到 GAS 並寫入 Google 試算表。

### 前端程式碼說明
- 使用 `fetch()` 發送 `POST` 請求。
- 資料格式為 JSON。
- 不使用任何前端框架或額外套件。

### 需要修改的檔案
- `index.html`
- `script.js`

### 1.1 `index.html`
請確認按鈕為：
```html
<button id="savePoint" type="button">儲存攝影點</button>
```

### 1.2 `script.js`
在檔案頂端加上 GAS URL 變數：
```js
const GAS_URL = ''; // 部署後填入 GAS 網頁應用程式 URL
```

儲存點時會呼叫 `sendPointToGAS()`，範例如下：
```js
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
```

### 1.3 `onSave()` 範例
```js
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
```

## 2. 後端：Google Apps Script (GAS)

### 目標
用最簡單的 `doPost(e)` 接收前端 `POST` JSON，並寫入 Google 試算表。

### 2.1 `Code.gs`
```js
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID');
    const sheet = ss.getSheetByName('工作表1') || ss.getSheets()[0];

    const row = [
      new Date(),
      data.routeId || '',
      data.routeName || '',
      data.pointId || '',
      data.name || '',
      data.desc || '',
      data.top || '',
      data.timestamp || ''
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### 2.2 GAS 部署步驟
1. 開啟 Google Apps Script，建立新專案。
2. 將 `Code.gs` 貼上。
3. 設定 `YOUR_SPREADSHEET_ID` 為你的試算表 ID。
4. 點選「部署」->「新增部署」-> 選擇「網頁應用程式」。
5. 存取權限選擇「任何人，包括匿名使用者」或適合的權限。
6. 取得部署後的 URL，貼回 `GAS_URL`。

### 2.3 範例試算表欄位
- A: 寫入時間
- B: routeId
- C: routeName
- D: pointId
- E: name
- F: desc
- G: top
- H: timestamp

## 3. 注意事項
- 這個方案不需要 API KEY 或 Google Cloud 設定。
- 前端只要有 `GAS_URL` 就可直接用 `fetch()` 傳資料。
- 後端只用 `doPost(e)` 解析 JSON，寫入試算表。

## 4. 追加說明
若你需要讓 GAS 回傳成功/失敗訊息給前端，可在 `fetch()` 的 `res.ok` 或 `res.json()` 中處理。
