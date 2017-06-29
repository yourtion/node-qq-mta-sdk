[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![David deps][david-image]][david-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]
[![npm license][license-image]][download-url]
[![Greenkeeper badge](https://badges.greenkeeper.io/yourtion/node-qq-mta-sdk.svg)](https://greenkeeper.io/)

[npm-image]: https://img.shields.io/npm/v/qq-mta.svg?style=flat-square
[npm-url]: https://npmjs.org/package/qq-mta
[travis-image]: https://img.shields.io/travis/yourtion/node-qq-mta-sdk.svg?style=flat-square
[travis-url]: https://travis-ci.org/yourtion/node-qq-mta-sdk
[coveralls-image]: https://img.shields.io/coveralls/yourtion/node-qq-mta-sdk.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/yourtion/node-qq-mta-sdk?branch=master
[david-image]: https://img.shields.io/david/yourtion/node-qq-mta-sdk.svg?style=flat-square
[david-url]: https://david-dm.org/yourtion/node-qq-mta-sdk
[node-image]: https://img.shields.io/badge/node.js-%3E=4.0-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/qq-mta.svg?style=flat-square
[download-url]: https://npmjs.org/package/qq-mta
[license-image]: https://img.shields.io/npm/l/qq-mta.svg

# qq-mta

Node.js SDK for QQ MTA (Mobile Tencent Analytics) 腾讯移动统计数据接口API Node.js SDK

## 安装使用使用

```bash
$ npm install qq-mta --save
```

```javascript
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
