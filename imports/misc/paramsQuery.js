export default function paramsQuery (filters, page) {
  if (page) {
    if (filters.query && filters.year) {
      return `${filters.sort}?query=${filters.query}&years=${filters.year}&page=${page}`;
    }
    if (filters.query) {
      return `${filters.sort}?query=${filters.query}&page=${page}`;
    }
    if (filters.year) {
      return `${filters.sort}?years=${filters.year}&page=${page}`;
    }

    return `${filters.sort}?page=${page}`;
  }

  if (filters.query && filters.year) {
    return `${filters.sort}?query=${filters.query}&years=${filters.year}`;
  }
  if (filters.query) {
    return `${filters.sort}?query=${filters.query}`;
  }
  if (filters.year) {
    return `${filters.sort}?years=${filters.year}`;
  }

  return `${filters.sort}`;
}
