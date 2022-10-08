import app from 'flarum/forum/app';
import Post from 'flarum/components/Post';
import { extend } from 'flarum/common/extend';
import TextEditor from 'flarum/common/components/TextEditor';
import TextEditorButton from 'flarum/common/components/TextEditorButton';
import mapFile from './components/mapFile';
import insertAtCursor from './components/mapBBCode';
import getMapConfig from './components/mapConfigHelper';

app.initializers.add('jeromegillard/osm', () => {
  app.store.models.files = mapFile;

  extend(TextEditor.prototype, 'toolbarItems', function (items) {
    let mapConf = getMapConfig();
    items.add(
      'bbcode',
      <TextEditorButton onclick={() => insertAtCursor(mapConf.tilesProvider, mapConf.currentStyle, mapConf.zoom)} icon={'fas fa-map'}>
        {app.translator.trans('jeromegillard-map.forum.text_editor.bbcode_tooltip')}
      </TextEditorButton>
    );
  });

});

extend(Post.prototype, 'oncreate', function () {
  this.postId = this.attrs.post.id();
  this.mapConf = getMapConfig();

  // copy this for usage within .each()
  let so = this;

  //for each gpx file in this post, loop and map
  this.$('.mapFile-container').each(function( i ) {

    // grab the uploaded gpx file's UUID and url
    let uuid = $(this).children('.mapFile').data('fofUploadDownloadUuid');
    let nid = 'map-'+so.postId+i+'-'+uuid;
    let url = app.forum.attribute('apiUrl') + '/fof/download';
            url += '/' + uuid;
            url += '/' + so.postId;
            url += '/' + app.session.csrfToken;

    let fileExt = $(this).children('.mapFile').data('mapUrl').split('.').pop().toLowerCase();

    /*  change the template rendering to insert a new id to the map element.
      * this allows us to have an unique div id even if a same file is displayed
      * more than one time
    */
    $(this).children('.mapFile-placeholder').prop('id', nid);

    // Get the map element
    let map = L.map(nid);
    map.addControl(new L.Control.Fullscreen());

    // Set the tiles provider
    new L.tileLayer(so.mapConf.tileLayerURL,
    {
      key: so.mapConf.currentKey,
      maxZoom: so.mapConf.maxZoom,
      attribution: so.mapConf.attribution,
      id: so.mapConf.currentStyle,
      tileSize: so.mapConf.tileSize,
      zoomOffset: so.mapConf.zoomOffset,
      detectRetina: so.mapConf.detectRetina
    }).addTo(map);

    if(fileExt == 'gpx'){
    // Display the GPX file in it thanks to https://github.com/mpetazzoni/leaflet-gpx
    new L.GPX(url,
        {
          async: true,
          marker_options: {
            startIconUrl: '/assets/extensions/jeromegillard-map/pin-icon-start.png',
            endIconUrl: '/assets/extensions/jeromegillard-map/pin-icon-end.png',
            shadowUrl: '/assets/extensions/jeromegillard-map/pin-shadow.png',
            wptIconUrls: {
              '': '/assets/extensions/jeromegillard-map/default-waypoint.png',
              'Geocache Found': '/assets/extensions/jeromegillard-map/geocache.png',
              'Park': '/assets/extensions/jeromegillard-map/tree.png'
            },
          }
        }
      ).on('loaded', function(e) {
      map.fitBounds(e.target.getBounds());
      }).addTo(map);
    }

    else if(fileExt == 'json' || fileExt == 'geojson'){
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
      map.setView(so.mapConf.defaultLocation, so.mapConf.zoom);
    }

  });

  // for each map location from BBCode, loop and map
  this.$('.bbcode-map').each(function( i ) {
    let location = $(this).data('mapLocation');
    let mapConf = getMapConfig(
      $(this).data('mapProvider'),
      $(this).data('mapStyle'),
      $(this).data('mapZoom')
    )
    const nid = 'map-'+Math.floor(Math.random() * 1000);
    $(this).prop('id', nid);

    if(location){
      // resolve location as coordinates
      fetch(`https://nominatim.openstreetmap.org/search?q=${location}&format=json`)
        .then(response => response.json())
        .then(json => {

          // Get the map element
          let map = L.map(nid);
          map.addControl(new L.Control.Fullscreen());
          // Set the tiles provider
          new L.tileLayer(mapConf.tileLayerURL,
            {
              key: mapConf.currentKey,
              maxZoom: mapConf.maxZoom,
              attribution: mapConf.attribution,
              id: mapConf.currentStyle,
              tileSize: mapConf.tileSize,
              zoomOffset: mapConf.zoomOffset,
              detectRetina: mapConf.detectRetina
            }).addTo(map);
          map.setView([json[0].lat, json[0].lon], mapConf.zoom);
        });
    }
  });

});
