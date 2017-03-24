'use strict';

/**
 *  Tencent MTA API
 *
 * @author Yourtion Guo <yourtion@gmail.com>
 */

const assert = require('assert');
const crypto = require('crypto');
const request = require('request');
const debug = require('debug')('mta:');

class MTA {
  constructor(options) {

    this.options = options || {};
    assert(options.appId && typeof options.appId === 'string', 'invalid option appId');
    assert(options.appKey && typeof options.appKey === 'string', 'invalid option appKey');
    options.token = options.appKey + '&';
    if (options.url) {
      assert(typeof options.url === 'string', 'invalid url');
    } else {
      options.url = 'http://openapi.mta.qq.com';
    }
    if (options.timeout) {
      assert(typeof options.timeout === 'number', 'invalid option timeout');
      assert(options.timeout > 1000, 'option timeout is too short! must be > 1000');
    } else {
      options.timeout = 10000;
    }
  }

  signature(url, params, method = 'GET') {
    const paramsString = Object.keys(params).sort().map(k => k + '=' + params[k]).join('&');
    const urlString = method + '&' + encodeURIComponent(url);
    const signString = urlString + '&' + encodeURIComponent(paramsString);
    const signHmac = crypto.createHmac('sha1', this.options.token).update(signString).digest();
    const sign = crypto.createHash('md5').update(signHmac).digest('hex');
    debug('signature: %s <= %s', sign, signString);
    return sign;
  }

  request(api, _params, method = 'GET') {
    return new Promise((resolve, reject) => {

      assert(method && typeof method === 'string', 'invalid method');
      assert(api && typeof api === 'string', 'invalid api');

      const params = Object.assign({}, _params);
      params.app_id = this.options.appId;

      params.sign = this.signature(api, params);

      const opt = {
        method: method.toUpperCase(),
        url: this.options.url + api,
        qs: params,
        timeout: this.options.timeout,
        json: true,
      };
      
      debug('request: %j', opt);

      request(opt, (err, res, data) => {
        debug('response: err=%s, data=%j', err, data);
        if (err) return reject(err);

        if (data && data.ret_msg === 'success') {
          resolve(data.data);
        } else {
          reject(data);
        }
      });

    });
  }

  parseParams(params) {
    const ret = {};
    if(Array.isArray(params.idx)) {
      ret.idx = params.idx.join(',');
    } else {
      ret.idx = params.idx;
    }
    if(params.ty) ret.ty = params.ty;
    if(params.errTy) ret.err_ty = params.errTy;
    ret.start_date = params.start;
    ret.end_date = params.end;
    return ret;
  }

  /**
   * 应用基本指标 - 离线数据
   * @param {Number|Array} idx - 指标id
   * @param {String} start - 开始时间（YYYY-MM-DD）
   * @param {String} end - 结束时间（YYY-MM-DD）
   *
   * @returns {Promise}
   */
  userBasicOffline(idx, start, end) {
    return this.request('/ctr_user_basic/get_offline_data', this.parseParams({ idx, start, end }));
  }

  /**
   * 应用基本指标 - 实时数据
   * @param {Number|Array} idx - 指标id
   * @param {String} start - 开始时间（YYYY-MM-DD）
   * @param {String} end - 结束时间（YYY-MM-DD）
   *
   * @returns {Promise}
   */
  userBasicRealtime(idx, start, end) {
    return this.request('/ctr_user_basic/get_realtime_data', this.parseParams({ idx, start, end }));
  }

  /**
   * 终端设备数据
   * @param {Number|Array} idx - 指标id
   * @param {Number} ty - 终端类型
   * @param {String} start - 开始时间（YYYY-MM-DD）
   * @param {String} end - 结束时间（YYY-MM-DD）
   *
   * @returns {Promise}
   */
  terminal(idx, ty, start, end) {
    return this.request('/ctr_terminal_anal/get_offline_data', this.parseParams({ idx, ty, start, end }));
  }

  /**
   * 用户行为数据 - DAU、WAU、MAU
   * @param {Number|Array} idx - 指标id
   * @param {String} start - 开始时间（YYYY-MM-DD）
   * @param {String} end - 结束时间（YYY-MM-DD）
   *
   * @returns {Promise}
   */
  active(idx, start, end) {
    return this.request('/ctr_active_anal/get_offline_data', this.parseParams({ idx, start, end }));
  }

  /**
   * 用户行为数据 - 使用时长、访问页面
   * @param {Number|Array} idx - 指标id
   * @param {String} start - 开始时间（YYYY-MM-DD）
   * @param {String} end - 结束时间（YYY-MM-DD）
   *
   * @returns {Promise}
   */
  usage(idx, start, end) {
    return this.request('/ctr_usage_anal/get_offline_data', this.parseParams({ idx, start, end }));
  }

  /**
   * 用户行为数据 - 使用频率
   * @param {Number|Array} idx - 指标id
   * @param {String} start - 开始时间（YYYY-MM-DD）
   * @param {String} end - 结束时间（YYY-MM-DD）
   *
   * @returns {Promise}
   */
  usageFreq(idx, start, end) {
    return this.request('/ctr_usage_anal/get_freq_dis', this.parseParams({ idx, start, end }));
  }

  /**
   * 开发支持数据 - 错误次数、错误覆盖人数
   * @param {Number|Array} idx - 指标id
   * @param {String} start - 开始时间（YYYY-MM-DD）
   * @param {String} end - 结束时间（YYY-MM-DD）
   *
   * @returns {Promise}
   */
  crash(idx, start, end) {
    return this.request('/ctr_crash_anal/get_offline_data', this.parseParams({ idx, start, end }));
  }

  /**
   * 开发支持数据 - 环境数据
   * @param {Number|Array} idx - 指标id
   * @param {Number} ty - 终端类型
   * @param {String} start - 开始时间（YYYY-MM-DD）
   * @param {String} end - 结束时间（YYY-MM-DD）
   *
   * @returns {Promise}
   */
  crashEnv(idx, ty, start, end) {
    return this.request('/ctr_crash_anal/get_env_dis', this.parseParams({ idx, ty, start, end }));
  }

  /**
   * 开发支持数据 - 崩溃列表
   * @param {Number|Array} idx - 指标id
   * @param {Number} errTy - 错误类型
   * @param {String} start - 开始时间（YYYY-MM-DD）
   * @param {String} end - 结束时间（YYY-MM-DD）
   *
   * @returns {Promise}
   */
  crashList(idx, errTy, start, end) {
    return this.request('/ctr_crash_anal/get_err_list', this.parseParams({ idx, errTy, start, end }));
  }
}

module.exports = MTA;
