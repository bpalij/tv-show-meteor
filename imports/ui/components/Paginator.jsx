import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// es-lint-disable-next-line no-unused-vars
// import Links from '../../api/links.js';
// import '../../methods.js';
// import headersToObj from '../../misc/headersToObj.js';
// import getImageLinks from '../../misc/getImageLinks.js';
// import paramsQuery from '../../misc/paramsQuery.js';

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
    Meteor.call('getInfo', filters, page, function(err, result) {
      if (err) {
        setError(`Error '${err}', try to reload page`);
      } else {
        const { data, headers, images } = result;
        loadedData(data, headers, images);
      }
    });
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
