import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actionCreators from '../redux/actions.js';
import './ReduxApp.css';
import Form from './Form.jsx';
import Table from './Table.jsx';
import Paginator from './Paginator.jsx';
import ErrorMessage from './ErrorMessage.jsx';

class ReduxApp extends Component {
  componentDidMount() {
    const { loadedData, setError } = this.props;
    Meteor.call('getInfo', { sort: 'trending' }, undefined, function(err, result) {
      if (err) {
        setError(`Error '${err}', try to reload page`);
      } else {
        const { data, headers, images } = result;
        loadedData(data, headers, images);
      }
    });
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
