# 執行專案 d3-sample-app Process

- 使用 Create-React-App
- 安裝 Tailwind CSS
- Git 進行版本管理，盡量 Atomic
- 建立基本板型切分
- 建立 Payment Details 測試資料
- 對接 Payment Details 測試資料，建立表格
  - 建立 LayoutOverlay 等待 3 秒後出現
  - 建立手風琴效果
  - 建立經典原生 CSS Loading 效果
  - 樣式細節調整

### 使用 Using d3.js

- 建立交易測試資料供左一，左二圖表使用
- 建立左一折線圖表

  - 找到高度類似範例 [Line chart with tooltip / D3 | Observable (observablehq.com)](https://observablehq.com/@d3/line-with-tooltip/2?intent=fork)
  - 建立基本折線圖
  - 建立 Tooltip 與圓點，並註明位數
  - 去除 X 軸，Y 軸線條
  - 減少 tick 標註字樣
- 建立左二試管圖表

  - 
  - 建立背景長條圖、實質長條圖
  - 標註字樣
  - 建立總數計算之圖例，並註明位數
- 建立資產統計測試資料供左三圖表使用
- 建立左三甜甜圈圖表 (Donut Chart)

  - 參考 [https://d3-graph-gallery.com/donut.html](https://d3-graph-gallery.com/donut.html)
  - 建立圓餅圖、計算中空半徑
  - 放置圖例與總數統計，並註明位數
- 建立總體交易測試資料
- 建立右邊複雜人口圖表變體與折線圖集合

  - 找到原圖為 [(3) FMCPAY on X: &#34;UPDATE ON THE 24-HOUR CRYPTO MARKET (20/2) $BTC is currently forming a short-term peak, and the potential for future growth is expected to weaken, giving way to ETH and altcoins. $ETH is approaching the $3000 mark, breaking through this level will trigger a larger fomo wave for… https://t.co/QCEfGMgz1Z&#34; / X (twitter.com)](https://twitter.com/FMCPay/status/1759765923215614006)
  - 查看人口圖 [https://doylek.github.io/D3-Population-Pyramid/](https://doylek.github.io/D3-Population-Pyramid/)
  - 建立向上與向下生長之長條圖，從中間開始計算
  - 建立複數 Y 軸
  - 建立折線圖，對照時間產生 tick
  - 建立豎線、三顆圓點
  - 建立 Tooltip
  - 建立 Legend 圖例
  - 暗夜模式調整

### 部署 Deployment

- 使用 Github Pages ( Github 已串接個人網域)
- 使用 gh-pages 套件
- 使用 npm script 部署
- `npm run deploy` 即可部署至  https://個人網域/d3-sample-app

### 問題 Struggles

- 3日內可能較難以 React 各類套件完成複雜圖表，決定採用原生作法 (vanilla JS)
- 遭遇右方圖表 tooltip 於間隔處無法正確顯示資料問題
- 思路轉換，記錄上一次記錄之資料（若無則不顯示），以其作為顯示，避免非預期資料
- 學習大量原生 d3.js 語法與常用工具 (tooltip, legend, 常用事件處理⋯⋯)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
