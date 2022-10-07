import app from 'flarum/forum/app';
import Post from 'flarum/components/Post';
import { extend } from 'flarum/common/extend';
import TextEditor from 'flarum/common/components/TextEditor';
import TextEditorButton from 'flarum/common/components/TextEditorButton';
import File from './components/File';
import insertAtCursor from './components/OSMBBCode';

app.initializers.add('jeromegillard/osm', () => {
  app.store.models.files = File;

  extend(TextEditor.prototype, 'toolbarItems', function (items) {
    if (/*app.forum.attribute('zerosonesfun-bbcode-button.code') === ""*/false) {
      return; } else {
      items.add(
        'bbcode',
        <TextEditorButton onclick={() => insertAtCursor(this.tilesProvider)} icon={'fas fa-map'}>
          {app.translator.trans('jeromegillard-osm.forum.text_editor.bbcode_tooltip')}
        </TextEditorButton>
      ); }
    });

});

extend(Post.prototype, 'oncreate', function () {
  this.postId = this.attrs.post.id();
  this.tilesProvider = app.forum.attribute("tilesProvider")??'osm';
  this.currentKey = '';
  this.currentStyle = '';

  switch(this.tilesProvider){
    case "mapbox":
      this.currentKey = app.forum.attribute("mapbox.key")??'';
      this.currentStyle = app.forum.attribute("mapbox.style")??'mapbox/light-v9';
      this.tileLayerURL = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}@2x?access_token={key}';
      this.attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, ' +
      '© <a href="https://www.mapbox.com/">Mapbox</a>';
      break;
    case "thunderforest":
      this.currentKey = app.forum.attribute("thunderforest.key")??'';
      this.currentStyle = app.forum.attribute("thunderforest.style")??'atlas';
      this.tileLayerURL = 'https://tile.thunderforest.com/{id}/{z}/{x}/{y}.png?apikey={key}';
      this.attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, ' +
      '© <a href="https://www.thunderforest.com/">Thunderforest</a>';
      break;
    default:
      this.tileLayerURL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
      this.attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
  }

  // copy this for usage within .each()
  let so = this;

  //for each gpx file in this post, loop and map
  this.$('.osmFile').each(function( i ) {

    // grab the uploaded gpx file's UUID and url
    let uuid = $(this).data('fofUploadDownloadUuid');
    let nid = 'map-'+so.postId+i+'-'+uuid;
    let url = app.forum.attribute('apiUrl') + '/fof/download';
            url += '/' + uuid;
            url += '/' + so.postId;
            url += '/' + app.session.csrfToken;

    let fileExt = $(this).data('mapUrl').split('.').pop().toLowerCase();

    /*  change the template rendering to insert a new id to the map element.
      * this allows us to have an unique div id even if a same file is displayed
      * more than one time
    */
    var oldNode = document.getElementById('map--'+uuid);
    var newNode = oldNode.cloneNode(true);
    newNode.id = nid;
    oldNode.parentNode.replaceChild(newNode, oldNode);

    // Get the map element
    let map = L.map(nid);
    map.addControl(new L.Control.Fullscreen());

    // Set the tiles provider
    new L.tileLayer(so.tileLayerURL,
    {
      key: so.currentKey,
      maxZoom: 18,
      attribution: so.attribution,
      id: so.currentStyle,
      tileSize: 512,
      zoomOffset: -1,
      detectRetina: true
    }).addTo(map);

    if(fileExt == 'gpx'){
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
    }

    else if(fileExt == 'geojson'){
      fetch(url)
        .then(response => response.json())
        .then(json => {

          function onEachFeature(feature, layer) {
            var popupContent = '';

            if (feature.properties && feature.properties.name) {
              popupContent += feature.properties.name;
            }

            layer.bindPopup(popupContent);
          }

          var geoJSONLayer = L.geoJSON([json], {
            style: function (feature) {
              if( feature.properties && feature.properties.colour){
                return {
                  color: feature.properties.colour,
                  weight: 3,
                  opacity: 1
                  };
              }
            },
            onEachFeature: onEachFeature,
          }).addTo(map);
          map.fitBounds(geoJSONLayer.getBounds());
          });
    }

    else {
      map.setView([51.505, -0.09], 13);
    }

  });

});
