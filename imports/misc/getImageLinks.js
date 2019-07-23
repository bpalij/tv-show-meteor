import { Meteor } from 'meteor/meteor';

async function getImageLink(item) {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/find/${item.show ? item.show.ids.imdb : item.ids.imdb}?api_key=${Meteor.settings.public.tmdbLocalhost}&language=en-US&external_source=imdb_id`);
    const info = await res.json();
    const img = info.tv_results[0].poster_path;
    if (!img) {
      throw new Error('no img');
    } else {
      return `https://image.tmdb.org/t/p/original/${img}`;
    }
  } catch (e) {
    return '';
  }
}
async function getImageLinks(data) {
  const links = Promise.all(data.map(x => getImageLink(x)));
  return links;
}

export default getImageLinks;
