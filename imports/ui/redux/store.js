import { combineReducers, createStore } from 'redux';
import {
  START_LOAD_DATA, LOADED_DATA, CHANGED_PARAMS, ERROR_MESSAGE,
} from './actionTypes';

const disableInput = (state = true, action) => {
  switch (action.type) {
    case START_LOAD_DATA:
      return true;
    case LOADED_DATA:
      return false;
    default:
      return state;
  }
};

const data = (state = [], action) => {
  switch (action.type) {
    case LOADED_DATA:
      return action.data.data;
    default:
      return state;
  }
};

const headers = (state = {}, action) => {
  switch (action.type) {
    case LOADED_DATA:
      return action.data.headers;
    default:
      return state;
  }
};

const images = (state = [], action) => {
  switch (action.type) {
    case LOADED_DATA:
      return action.data.images;
    default:
      return state;
  }
};

const defaultPaginator = {
  page: 1,
  pages: 0,
  disableFirst: true,
  disableLast: true,
};

const paginator = (state = defaultPaginator, action) => {
  let headerPage;
  let headerPages;
  switch (action.type) {
    case LOADED_DATA:
      headerPage = +action.data.headers['x-pagination-page'];
      headerPages = +action.data.headers['x-pagination-page-count'];
      return {
        page: headerPage || 1,
        pages: headerPages || 0,
        disableFirst: !!(typeof (headerPage) !== 'number' || !headerPage || headerPage <= 1),
        disableLast: !!(typeof (headerPages) !== 'number' || typeof (headerPage) !== 'number' || !headerPage || !headerPages || headerPage >= headerPages),
      };
    default:
      return state;
  }
};

const defaultFilters = {
  query: '',
  year: '',
  sort: 'trending',
};

const filters = (state = defaultFilters, action) => {
  switch (action.type) {
    case CHANGED_PARAMS:
      return action.data;
    default:
      return state;
  }
};

const err = (state = '', action) => {
  switch (action.type) {
    case ERROR_MESSAGE:
      return action.data;
    default:
      return state;
  }
};

/* eslint-disable no-underscore-dangle */
const store = createStore(
  combineReducers({
    disableInput,
    data,
    headers,
    images,
    paginator,
    filters,
    err,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

export default store;
