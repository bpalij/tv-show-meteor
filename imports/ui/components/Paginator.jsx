import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import headersToObj from '../../misc/headersToObj.js';
import getImageLinks from '../../misc/getImageLinks.js';
import paramsQuery from '../../misc/paramsQuery.js';

class Paginator extends Component {
  constructor(props) {
    super(props);
    this.loadPage = this.loadPage.bind(this);
  }

  loadPage(page) {
    const {
      loadedData, startLoadData, filters, setError,
    } = this.props;
    startLoadData();
    let headers;
    let dataTemp;
    fetch(`https://api.trakt.tv/shows/${paramsQuery(filters, page)}`, {
      headers: {
        'Content-Type': 'application/json',
        'trakt-api-version': '2',
        'trakt-api-key': `${Meteor.settings.public.traktClientId}`,
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
      .then((img) => { loadedData(dataTemp, headers, img); })
      .catch((e) => { setError(`Error '${e}', try to reload page`); });
  }

  render() {
    const { disableInput, paginator } = this.props;
    return (
      <div>
        <button type="button" disabled={disableInput || paginator.disableFirst} onClick={() => { this.loadPage(1); }}>{' << First '}</button>
        <button type="button" disabled={disableInput || paginator.disableFirst} onClick={() => { this.loadPage(+(paginator.page) - 1 || 1); }}>{' < Previous '}</button>
        {` ${paginator.page} of ${paginator.pages} `}
        <button type="button" disabled={disableInput || paginator.disableLast} onClick={() => { this.loadPage(Math.min(+(paginator.page) + 1 || 0, +(paginator.pages) || 0) || 1); }}>{' Next > '}</button>
        <button type="button" disabled={disableInput || paginator.disableLast} onClick={() => { this.loadPage(+(paginator.pages) || 1); }}>{' Last >> '}</button>
      </div>
    );
  }
}

Paginator.propTypes = {
  startLoadData: PropTypes.func.isRequired,
  loadedData: PropTypes.func.isRequired,
  disableInput: PropTypes.bool.isRequired,
  setError: PropTypes.func.isRequired,
  paginator: PropTypes.shape({
    page: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
    disableFirst: PropTypes.bool.isRequired,
    disableLast: PropTypes.bool.isRequired,
  }).isRequired,
  filters: PropTypes.shape({
    query: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    sort: PropTypes.string.isRequired,
  }).isRequired,
};

export default Paginator;
