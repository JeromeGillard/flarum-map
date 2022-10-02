import app from 'flarum/forum/app';
import osmMap from './osmMap';

app.initializers.add('jeromegillard/flarum-osm', () => {
  console.log('[jeromegillard/flarum-osm] Hello, forum!');

  osmMap();
});
