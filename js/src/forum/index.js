import app from 'flarum/forum/app';
import Post from 'flarum/components/Post';
import { extend } from 'flarum/common/extend';
import File from './components/File';

app.initializers.add('jeromegillard/flarum-osm', () => {
  app.store.models.files = File;
});

extend(Post.prototype, 'oncreate', function () {
  let postId = this.attrs.post.id();
  let mapboxKey = app.forum.attribute("osm.mapbox");
  
  //for each gpx file in this post, loop and map
  this.$('.osmFile').each(function( i ) {
    let url = app.forum.attribute('apiUrl') + '/fof/download';
            url += '/' + $(this).data('fofUploadDownloadUuid');
            url += '/' + postId;
            url += '/' + app.session.csrfToken;
    
    // grab the uploaded gpx file's UUID
    let uuid = $(this).data('fofUploadDownloadUuid');

    /*  change the template rendering to insert a new id to the map element.
      * this allows us to have an unique div id even if a same file is displayed
      * more than one time
    */
    var oldNode = document.getElementById('map--'+uuid);
    var newNode = oldNode.cloneNode(true);
    newNode.id = 'map-'+postId+i+'-'+uuid;
    oldNode.parentNode.replaceChild(newNode, oldNode);

    // Get the map element
    let map = L.map('map-'+postId+i+'-'+uuid);

    // Set the tiles provider
    let tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token='+mapboxKey, 
    {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/light-v9',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(map);

    // Display the GPX file in it thanks to https://github.com/mpetazzoni/leaflet-gpx
    new L.GPX(url, 
        {
          async: true,
          marker_options: {
            startIconUrl: '/assets/extensions/jeromegillard-osm/pin-icon-start.png',
            endIconUrl: '/assets/extensions/jeromegillard-osm/pin-icon-end.png',
            shadowUrl: '/assets/extensions/jeromegillard-osm/pin-shadow.png',
            wptIconUrls: {
              '': '/assets/extensions/jeromegillard-osm/default-waypoint.png',
              'Geocache Found': '/assets/extensions/jeromegillard-osm/geocache.png',
              'Park': '/assets/extensions/jeromegillard-osm/tree.png'
            },
          }
        }
      ).on('loaded', function(e) {
      map.fitBounds(e.target.getBounds());
    }).addTo(map);

  });

});