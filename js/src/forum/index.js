import app from 'flarum/forum/app';
import Post from 'flarum/components/Post';
import { extend } from 'flarum/common/extend';
import OSMMap from './components/OSMMap';
import File from './components/File';

app.initializers.add('jeromegillard/flarum-osm', () => {
  console.log('[jeromegillard/flarum-osm] Hello, forum!');

  app.store.models.files = File;
});

extend(Post.prototype, 'oncreate', function () {
  let postId = this.attrs.post.id();
  console.log("Found post id #", postId), this.attrs.post;

  
  let mapboxKey = app.forum.attribute("osm.mapbox");
  
  //for each gpx file in this post, loop and map
  this.$('.osmFile').each(function( i ) {
    let url = app.forum.attribute('apiUrl') + '/fof/download';
            url += '/' + $(this).data('fofUploadDownloadUuid');
            url += '/' + postId;
            url += '/' + app.session.csrfToken;
    console.log(url);
    let uuid = $(this).data('fofUploadDownloadUuid');
    let map = L.map('map-'+uuid).setView([50.4631,5.7533], 13);

    let tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token='+mapboxKey, 
    {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/light-v9',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(map);

  });

});