import { Meteor } from 'meteor/meteor';
import fetch from 'node-fetch';
import headersToObj from './misc/headersToObj.js';
import getImageLinks from './misc/getImageLinks.js';
import paramsQuery from './misc/paramsQuery.js';

async function getInfo (filters, page) {
  check(page, Match.Maybe(Match.OneOf(Match.Integer, String)));
  check(filters, Match.ObjectIncluding(
    {
      sort: String,
      query: Match.Maybe(String),
      year: Match.Maybe(Match.OneOf(Match.Integer, String)),
    },
  ));
  try {
    let headers;
    let data;
    const res = await fetch(`https://api.trakt.tv/shows/${paramsQuery(filters, page)}`, {
      headers: {
        'Content-Type': 'application/json',
        'trakt-api-version': '2',
        'trakt-api-key': `${Meteor.settings.traktClientId}`,
      },
    });
    if (res.ok) {
      headers = headersToObj(res.headers);
      data = await res.json();
      const images = await getImageLinks(data);
      return { data, headers, images };
    }
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  } catch (e) {
    throw new Meteor.Error(e);
  }
}

Meteor.methods({
  getInfo,
});
