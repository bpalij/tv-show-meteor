import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import headersToObj from '../../misc/headersToObj.js';
import getImageLinks from '../../misc/getImageLinks.js';
import paramsQuery from '../../misc/paramsQuery.js';

const yearOptions = [''];
for (let i = ((new Date()).getFullYear()); i >= 1800; i -= 1) {
  yearOptions.push(`${i}`);
}

const sortOptions = [
  { value: 'trending', text: 'Trending' },
  { value: 'popular', text: 'Popular' },
  { value: 'played/weekly', text: 'Most played (weekly)' },
  { value: 'played/monthly', text: 'Most played (monthly)' },
  { value: 'played/yearly', text: 'Most played (yearly)' },
  { value: 'played/all', text: 'Most played (all)' },
  { value: 'watched/weekly', text: 'Most watched (weekly)' },
  { value: 'watched/monthly', text: 'Most watched (monthly)' },
  { value: 'watched/yearly', text: 'Most watched (yearly)' },
  { value: 'watched/all', text: 'Most watched (all)' },
  { value: 'collected/weekly', text: 'Most collected (weekly)' },
  { value: 'collected/monthly', text: 'Most collected (monthly)' },
  { value: 'collected/yearly', text: 'Most collected (yearly)' },
  { value: 'collected/all', text: 'Most collected (all)' },
  { value: 'anticipated', text: 'Most anticipated' },
];

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      year: '',
      sort: 'trending',
    };
    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick() {
    const {
      changeParams, startLoadData, loadedData, setError,
    } = this.props;
    const newFilters = { ...this.state };
    changeParams(newFilters);
    startLoadData();
    let headers;
    let dataTemp;
    fetch(`https://api.trakt.tv/shows/${paramsQuery(newFilters)}`, {
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
    const { query, year, sort } = this.state;
    const { disableInput } = this.props;
    return (
      <form className="form-table-width main-form">
        <div className="form-flex-line">
          <div className="form-item">
            <label htmlFor="query-input">
              Query
              <input type="text" id="query-input" value={query} disabled={disableInput} onChange={(e) => { this.setState({ query: e.target.value }); }} />
            </label>
          </div>
          <div className="form-item">
            <label htmlFor="year-select">
              Year
              <select id="year-select" value={year} disabled={disableInput} onChange={(e) => { this.setState({ year: e.target.value }); }} onBlur={(e) => { this.setState({ year: e.target.value }); }}>
                {yearOptions.map(x => (<option value={x} key={x}>{x}</option>))}
              </select>
            </label>
          </div>
          <div className="form-item">
            <label htmlFor="sort-select">
              Sort
              <select id="sort-select" value={sort} disabled={disableInput} onChange={(e) => { this.setState({ sort: e.target.value }); }} onBlur={(e) => { this.setState({ sort: e.target.value }); }}>
                {sortOptions.map(x => (<option key={x.value} value={x.value}>{x.text}</option>))}
              </select>
            </label>
          </div>
        </div>
        <div className="form-flex-right-button">
          <div className="form-item">
            <button type="button" onClick={this.buttonClick} disabled={disableInput}>Change</button>
          </div>
        </div>
      </form>
    );
  }
}

Form.propTypes = {
  disableInput: PropTypes.bool.isRequired,
  startLoadData: PropTypes.func.isRequired,
  loadedData: PropTypes.func.isRequired,
  changeParams: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};

export default Form;
