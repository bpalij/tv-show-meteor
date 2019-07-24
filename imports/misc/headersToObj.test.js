import assert from 'assert';
import { Headers } from 'node-fetch';
import headersToObj from './headersToObj.js';

describe('headersToObj', function() {
  it('example case of mdn doc on new Headers()', function() {
    assert.deepStrictEqual(headersToObj(new Headers({ 'Content-Type': 'image/jpeg', 'Accept-Charset': 'utf-8', 'X-My-Custom-Header': 'Zeke are cool' })), { 'content-type': 'image/jpeg', 'accept-charset': 'utf-8', 'x-my-custom-header': 'Zeke are cool' });
  });
});
