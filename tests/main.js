import assert from 'assert';
import '../imports/misc/paramsQuery.test.js';
import '../imports/misc/headersToObj.test.js';
import '../settings.test.js';
import '../imports/ui/redux/actionTypes.test.js';
import '../imports/ui/redux/actions.test.js';

describe('tv-show-meteor', function () {
  it('package.json has correct name', async function () {
    const { name } = await import('../package.json');
    assert.strictEqual(name, 'tv-show-meteor');
  });

  if (Meteor.isClient) {
    it('client is not server', function () {
      assert.strictEqual(Meteor.isServer, false);
    });
  }

  if (Meteor.isServer) {
    it('server is not client', function () {
      assert.strictEqual(Meteor.isClient, false);
    });
  }
});
