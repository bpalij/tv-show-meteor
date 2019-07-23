import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import headersToObj from '../../misc/headersToObj.js';
import * as actionCreators from '../redux/actions.js';
import './ReduxApp.css';
import Form from './Form.jsx';
import Table from './Table.jsx';
import Paginator from './Paginator.jsx';
import getImageLinks from '../../misc/getImageLinks.js';
import ErrorMessage from './ErrorMessage.jsx';

class ReduxApp extends Component {
  componentDidMount() {
    const { loadedData, setError } = this.props;
    let headers;
    let dataTemp;
    fetch('https://api.trakt.tv/shows/trending', {
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
    const {
      headers,
      data,
      images,
      disableInput,
      changeParams,
      startLoadData,
      loadedData,
      paginator,
      filters,
      err,
      setError,
    } = this.props;
    return (
      <div className="flexbox-center">
        {!err && (
        <Form
          disableInput={disableInput}
          changeParams={changeParams}
          startLoadData={startLoadData}
          loadedData={loadedData}
          setError={setError}
        />
        )}
        {!err && <Table headers={headers} data={data} images={images} />}
        {!err && (
        <Paginator
          paginator={paginator}
          startLoadData={startLoadData}
          loadedData={loadedData}
          filters={filters}
          disableInput={disableInput}
          setError={setError}
        />
        )}
        {!err && <div className="final-whitespace" />}
        {err && <ErrorMessage err={err} />}
      </div>
    );
  }
}

ReduxApp.propTypes = {
  startLoadData: PropTypes.func.isRequired,
  loadedData: PropTypes.func.isRequired,
  changeParams: PropTypes.func.isRequired,
  disableInput: PropTypes.bool.isRequired,
  setError: PropTypes.func.isRequired,
  err: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  headers: PropTypes.instanceOf(Object).isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
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

const mapStateToProps = (state) => {
  const {
    disableInput, data, headers, images, paginator, filters, err,
  } = state;
  return {
    disableInput, data, headers, images, paginator, filters, err,
  };
};

const mapDispatchToProps = {
  startLoadData: actionCreators.startLoadData,
  loadedData: actionCreators.loadedData,
  changeParams: actionCreators.changeParams,
  setError: actionCreators.setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxApp);
