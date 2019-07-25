import headersToObj from './misc/headersToObj.js';
import getImageLinks from './misc/getImageLinks.js';
import paramsQuery from './misc/paramsQuery.js';

Meteor.methods = ({
  getInfo (filters, page) {
    let headers;
    let dataTemp;
    return fetch(`https://api.trakt.tv/shows/${paramsQuery(filters, page)}`, {
      headers: {
        'Content-Type': 'application/json',
        'trakt-api-version': '2',
        'trakt-api-key': `${Meteor.settings.traktClientId}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          headers = headersToObj(res.headers);
          return res.json();
        }
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      })
      .then((data) => {
        dataTemp = data;
        return getImageLinks(data);
      })
      .then(images => ({ data: dataTemp, headers, images }))
      .catch((e) => { throw new Meteor.Error(e); });
  },
});
