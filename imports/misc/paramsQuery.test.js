import assert from 'assert';
import paramsQuery from './paramsQuery.js';

describe('paramsQuery', function() {
  it('({sort: "popular", query: "query", year: "2000"}, 3) works correct', function() {
    assert.strictEqual(paramsQuery({ sort: 'popular', query: 'query', year: '2000' }, 3), 'popular?query=query&years=2000&page=3');
  });
  it('({sort: "played/yearly", query: "word"}, "5") works correct', function() {
    assert.strictEqual(paramsQuery({ sort: 'played/yearly', query: 'word' }, '5'), 'played/yearly?query=word&page=5');
  });
  it('({sort: "watched/all", year: 1995}, 8) works correct', function() {
    assert.strictEqual(paramsQuery({ sort: 'watched/all', year: 1995 }, 8), 'watched/all?years=1995&page=8');
  });
  it('({sort: "anticipated"}, "13") works correct', function() {
    assert.strictEqual(paramsQuery({ sort: 'anticipated' }, '13'), 'anticipated?page=13');
  });
  it('({sort: "trending", query: "example", year: "2006"}) works correct', function() {
    assert.strictEqual(paramsQuery({ sort: 'trending', query: 'example', year: '2006' }), 'trending?query=example&years=2006');
  });
  it('({sort: "watched/monthly", query: "something"}) works correct', function() {
    assert.strictEqual(paramsQuery({ sort: 'watched/monthly', query: 'something' }), 'watched/monthly?query=something');
  });
  it('({sort: "collected/weekly", year: 1992}) works correct', function() {
    assert.strictEqual(paramsQuery({ sort: 'collected/weekly', year: 1992 }), 'collected/weekly?years=1992');
  });
  it('({sort: "played/weekly"}) works correct', function() {
    assert.strictEqual(paramsQuery({ sort: 'played/weekly' }), 'played/weekly');
  });
});
