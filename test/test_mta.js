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

describe('MTA', () => {

  const mta = new MTA({ appId: APP_ID, appKey: APP_KEY });
  const defaultOption = { idx: '10201,10202,10203', start_date: '2017-03-20', end_date: '2017-03-23' };

  it('signature', () => {
    const sign = mta.signature('/ctr_active_anal/get_offline_data', defaultOption);
    assert.equal(sign, '95fdb406151deb096a89b0ae553bde02');
  });

  it('request', () => {
    return mta.request('/ctr_active_anal/get_offline_data', Object.assign({ idx: '10201,10202,10203' }, defaultOption));
  });
});
