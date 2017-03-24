'use strict';

/**
 *  Tencent MTA Test
 *
 * @author Yourtion Guo <yourtion@gmail.com>
 */

const assert = require('assert');
const MTA = require('../');
const APP_ID = '3102416917';
const APP_KEY = 'AZY3D8C54AHU';
const TY = 1;
const START = '2017-03-20';
const END = '2017-03-23';

describe('MTA', () => {

  const mta = new MTA({ appId: APP_ID, appKey: APP_KEY });
  const defaultOption = { idx: '10201,10202,10203', start_date: START, end_date: END };

  it('signature', () => {
    const sign = mta.signature('/ctr_active_anal/get_offline_data', defaultOption);
    assert.equal(sign, '95fdb406151deb096a89b0ae553bde02');
  });

  it('userBasicOffline', () => {
    return mta.userBasicOffline(10101, START, END);
  });

  it('userBasicRealtime', () => {
    return mta.userBasicRealtime([ 10101, 10102 ], START, END);
  });

  it('terminal - 1', () => {
    return mta.terminal(10301, TY, START, END);
  });

  it('terminal - 2', () => {
    return mta.terminal([ 10301, 10302 ], TY, START, END);
  });

  it('active', () => {
    return mta.active(10201, START, END);
  });

  it('usage', () => {
    return mta.usage([ 10402, 10401 ], START, END);
  });

  it('usageFreq', () => {
    return mta.usageFreq(10405, START, END);
  });

  it('crash', () => {
    return mta.crash([ 10501, 10502 ], START, END);
  });

  it('crashEnv', () => {
    return mta.crashEnv(10502, TY, START, END);
  });

  it('crashList - 1', () => {
    return mta.crashList(10501, TY, START, END);
  });

  it('crashList - 2', () => {
    return mta.crashList([ 10501, 10502 ], TY, START, END);
  });

});
