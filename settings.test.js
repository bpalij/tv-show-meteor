import assert from 'assert';
// disabled rule because of such library
// eslint-disable-next-line camelcase
import { sha3_512 } from 'js-sha3';
import * as settings from './settings.json';

describe('settings.json', function() {
  it.skip('public.traktClientId hash is correct', function() {
    assert.strictEqual(sha3_512(`${settings.public.traktClientId}`), '8831f40ea62600a2f10b6e1944e550f6d8e9e8d9fbdc48d5da80554ec69c027e5dd475be79048358f6a81d476fbaeec91180cdf06d5a8bdec76b687a0e24112a');
  });
  it.skip('public.traktClientSecret hash is correct', function() {
    assert.strictEqual(sha3_512(`${settings.public.traktClientSecret}`), '49af0c1fe0258c8d655c464829bc0605c733983a3e9a243afc9ca4164cf889bba2c0592405a5f4efbc0dcbd13f454fa8b46b2003eec53eea3144c99b1b0f3a9b');
  });
  it.skip('public.tmdbLocalhost hash is correct', function() {
    assert.strictEqual(sha3_512(`${settings.public.tmdbLocalhost}`), '263f24ece96741031592b1b6822ab306a94ae26082c334acc30b3003c3c8eacdf5e74ecb59805364c0e1dd876c3326065c8d2e3e2676da6ac08fadb026fd28ee');
  });
  it('traktClientId hash is correct', function() {
    assert.strictEqual(sha3_512(`${settings.traktClientId}`), '8831f40ea62600a2f10b6e1944e550f6d8e9e8d9fbdc48d5da80554ec69c027e5dd475be79048358f6a81d476fbaeec91180cdf06d5a8bdec76b687a0e24112a');
  });
  it('traktClientSecret hash is correct', function() {
    assert.strictEqual(sha3_512(`${settings.traktClientSecret}`), '49af0c1fe0258c8d655c464829bc0605c733983a3e9a243afc9ca4164cf889bba2c0592405a5f4efbc0dcbd13f454fa8b46b2003eec53eea3144c99b1b0f3a9b');
  });
  it('tmdbLocalhost hash is correct', function() {
    assert.strictEqual(sha3_512(`${settings.tmdbLocalhost}`), '263f24ece96741031592b1b6822ab306a94ae26082c334acc30b3003c3c8eacdf5e74ecb59805364c0e1dd876c3326065c8d2e3e2676da6ac08fadb026fd28ee');
  });
});
