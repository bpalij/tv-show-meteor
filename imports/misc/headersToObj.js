export default function (headers) {
  return [...headers.entries()].reduce((acc, _val) => {
    const [key, val] = _val;
    acc[`${key}`] = val;
    return acc;
  }, {});
}
