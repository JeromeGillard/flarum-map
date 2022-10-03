import app from 'flarum/forum/app';
import Post from 'flarum/components/Post';
import { extend } from 'flarum/common/extend';
import OSMMap from './components/OSMMap';

app.initializers.add('jeromegillard/flarum-osm', () => {
  console.log('[jeromegillard/flarum-osm] Hello, forum!');
});

extend(Post.prototype, 'content', function (content) {
  let postId = this.attrs.post.id();
  console.log("Found post id # ", postId), this.attrs.post;
  content.push(
      <OSMMap pid={postId} /> 
  );
});