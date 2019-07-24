import assert from 'assert';
import {
  startLoadData, loadedData, changeParams, setError,
} from './actions.js';

describe('action creators', function() {
  it('startLoadData', function() {
    assert.deepStrictEqual(startLoadData(), { type: 'START_LOAD_DATA' });
  });
  it('loadedData', function() {
    assert.deepStrictEqual(loadedData({ data: 'data' }, { headers: 'headers' }, { images: 'images' }), { type: 'LOADED_DATA', data: { data: { data: 'data' }, headers: { headers: 'headers' }, images: { images: 'images' } } });
  });
  it('changeParams', function() {
    assert.deepStrictEqual(changeParams({ params: 'params' }), { type: 'CHANGED_PARAMS', data: { params: 'params' } });
  });
  it('setError', function() {
    assert.deepStrictEqual(setError('error'), { type: 'ERROR_MESSAGE', data: 'error' });
  });
});
