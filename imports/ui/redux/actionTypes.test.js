import assert from 'assert';
import {
  START_LOAD_DATA, LOADED_DATA, CHANGED_PARAMS, ERROR_MESSAGE,
} from './actionTypes';

describe('actionTypes', function() {
  it('START_LOAD_DATA', function() {
    assert.strictEqual(START_LOAD_DATA, 'START_LOAD_DATA');
  });
  it('LOADED_DATA', function() {
    assert.strictEqual(LOADED_DATA, 'LOADED_DATA');
  });
  it('CHANGED_PARAMS', function() {
    assert.strictEqual(CHANGED_PARAMS, 'CHANGED_PARAMS');
  });
  it('ERROR_MESSAGE', function() {
    assert.strictEqual(ERROR_MESSAGE, 'ERROR_MESSAGE');
  });
});
