import app from 'flarum/common/app';

app.initializers.add('jeromegillard/osm', () => {
  console.log('[jeromegillard/osm] Hello, forum and admin!');
});
