# qq-mta

Node.js SDK for qq mta (Mobile Tencent Analytics) 腾讯移动分析数据开放 SDK

## 安装使用使用

```bash
$ npm install qq-mta --save
```

```javascript
'use strict';

const MTA = require('qq-mta');

const client = new MTA({
  appId: 'YOUR_APP_ID',
  appKey: 'YOUR_KEY',
  timeout: 30000, // 可选参数，单位：ms
});
```

## 接口

接口详细参数参考文档 [腾讯移动分析 - 数据接口](https://mta.qq.com/mta/ctr_index/opd) :

- 应用基本指标 (离线数据) `userBasicOffline(idx, start, end)`
- 应用基本指标 (实时数据) `userBasicRealtime(idx, start, end)`
- 终端设备数据 `terminal(idx, ty, start, end)`
- 用户行为数据 (DAU、WAU、MAU) `active(idx, start, end)`
- 用户行为数据 (使用时长、访问页面) `usage(idx, start, end)`
- 用户行为数据 (使用频率) `usageFreq(idx, start, end)`
- 开发支持数据 (错误次数、错误覆盖人数) `crash(idx, start, end)`
- 开发支持数据 (环境数据) `crashEnv(idx, ty, start, end)`
- 开发支持数据 (崩溃列表) `crashList(idx, errTy, start, end)`
