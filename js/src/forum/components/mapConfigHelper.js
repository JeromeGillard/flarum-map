import app from 'flarum/forum/app';

export function getMapConfig(o_tilesProvider, o_style, o_zoom) {
    let tilesProvider = app.forum.attribute("tilesProvider")||'osm';
    let currentStyle;
    let currentKey;
    let tileLayerURL;
    let zoom = app.forum.attribute("zoom")||13;
    let attribution;
    let type = 'raster';
    let subdomains = [];

    if(o_tilesProvider &&
        o_tilesProvider === 'mapbox' ||
        o_tilesProvider === 'thunderforest' ||
        o_tilesProvider === 'osm' ||
        o_tilesProvider === 'gaode') {
            tilesProvider = o_tilesProvider;
    }

    if(o_style){
      switch(tilesProvider){
        case 'maptiler':
          if(o_style == 'basic-v2' ||
              o_style == 'basic-4326' ||
              o_style == 'bright-v2' ||
              o_style == 'openstreetmap' ||
              o_style == 'outdoor' ||
              o_style == 'pastel' ||
              o_style == 'hybrid' ||
              o_style == 'streets-v2' ||
              o_style == 'toner' ||
              o_style == 'topo' ||
              o_style == 'topographique' ||
              o_style == 'voyager' ||
              o_style == 'winter' ) {
              currentStyle = o_style;
          } else {
            console.log("Unknown style", o_style);
          }
          break;
        case 'mapbox':
            if(o_style === 'mapbox/streets-v11' ||
                o_style === 'mapbox/outdoors-v11' ||
                o_style === 'mapbox/light-v10' ||
                o_style === 'mapbox/dark-v10' ||
                o_style === 'mapbox/satellite-v9' ||
                o_style === 'mapbox/satellite-streets-v11' ||
                o_style === 'mapbox/navigation-day-v1' ||
                o_style === 'mapbox/streets-v11' ||
                o_style === 'mapbox/navigation-night-v1') {
                currentStyle = o_style;
            }
            else {
              console.log("Unknown style", o_style);
            }
            break;
        case 'thunderforest':
            if(o_style === 'cycle' ||
                o_style === 'transport' ||
                o_style === 'landscape' ||
                o_style === 'outdoors' ||
                o_style === 'transport-dark9' ||
                o_style === 'spinal-map' ||
                o_style === 'pioneer' ||
                o_style === 'mobile-atlas' ||
                o_style === 'neighbourhood' ||
                o_style === 'atlas') {
                currentStyle = o_style;
            }
            else {
              console.log("Unknown style", o_style);
            }
            break;
        case 'gaode':
          if(o_style === 8 ||
              o_style == 6) {
              currentStyle = o_style;
            }
            else {
              console.log("Unknown style", o_style);
            }
      }
  }

    switch(tilesProvider){
        case "mapbox":
          type = 'gl';
          currentKey = app.forum.attribute("mapbox.key")||'';
          currentStyle = currentStyle || app.forum.attribute("mapbox.style")||'mapbox/light-v9';
          tileLayerURL = 'mapbox://styles/'+currentStyle;
          attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, ' +
          '© <a href="https://www.mapbox.com/">Mapbox</a>';
          break;
        case "thunderforest":
          type: 'gl';
          currentKey = app.forum.attribute("thunderforest.key")||'';
          currentStyle = currentStyle || app.forum.attribute("thunderforest.style")||'atlas';
          tileLayerURL = 'https://tile.thunderforest.com/{id}/{z}/{x}/{y}.png?apikey={key}';
          attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, ' +
          '© <a href="https://www.thunderforest.com/">Thunderforest</a>';
          break;
        case "maptiler":
          type = 'gl';
          currentKey = app.forum.attribute("maptiler.key")||'';
          currentStyle = currentStyle || app.forum.attribute("maptiler.style")||'basic-v2';
          tileLayerURL = 'https://api.maptiler.com/maps/'+currentStyle+'/style.json?key='+currentKey;
          attribution = "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e";
          break;
        case "gaode":
          currentStyle = currentStyle || app.forum.attribute("gaode.style")||'8';
          tileLayerURL = 'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style='+currentStyle+'&x={x}&y={y}&z={z}';
          subdomains = ["1", "2", "3", "4"]
          attribution = '&copy; <a href="https://www.autonavi.com">autonavi</a>';
          break;
        default:
          tileLayerURL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
          attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

          // tileLayerURL = 'https://{s}.tile.osm.org/{z}/{x}/{y}.png",
          // subdomains = ['a', 'b', 'c']
    }


    if(o_zoom){
      zoom = o_zoom;
    }
    if(zoom < 0 || zoom > 18){
        zoom = 13;
    }
    return {"tilesProvider": tilesProvider, "attribution": attribution,"currentStyle":
                currentStyle, "currentKey": currentKey, "tileLayerURL": tileLayerURL,
                "zoom": zoom, maxZoom: 18, tileSize: 512, zoomOffset: -1, detectRetina: true,
                defaultLocation: [51.505, -0.09], "type": type, "subdomains": subdomains };
  };

export function getTileLayer(mapConf){
  //console.log(mapConf);
  if(mapConf && mapConf.tilesProvider){
    // Allow SVG tiles from 'gl' providers (MapTiler for instance)
    if(mapConf.type === 'gl'){
      return new L.mapboxGL({
        attribution: mapConf.attribution,
        accessToken: mapConf.currentKey,
        style: mapConf.tileLayerURL
      });
    } else {
      // Raster tiles
      return new L.tileLayer(mapConf.tileLayerURL,
        {
          key: mapConf.currentKey,
          maxZoom: mapConf.maxZoom,
          attribution: mapConf.attribution,
          id: mapConf.currentStyle,
          tileSize: mapConf.tileSize,
          zoomOffset: mapConf.zoomOffset,
          detectRetina: mapConf.detectRetina,
          subdomains: mapConf.subdomains
        });
    }
  }
};


export function createMap(pid) {
  let so = {};
  so.postId = pid;
  so.mapConf = getMapConfig();

  //for each gpx file in this post, loop and map
  $('div.PostStream-item[data-id="'+pid+'"] .mapFile-container, div.Pages-container .mapFile-container').each(function( i ) {

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
    getTileLayer(so.mapConf).addTo(map);

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

    else if(fileExt === 'json' || fileExt === 'geojson'){
      fetch(url)
        .then(response => response.json())
        .then(json => {

          function onEachFeature(feature, layer) {

            if(feature && feature.properties){
              var popupContent = '';

              if (feature.properties.name) {
                popupContent += feature.properties.name;
              }
              if (feature.properties.description) {
                popupContent += feature.properties.description;
              }

              if (feature.properties.amenity === 'parking') {
                // Check if feature is a polygon
                if (feature.geometry.type === 'Polygon') {
                  // Prepare a parking icon
                  var parkingIcon = L.icon({
                    iconUrl: '/assets/extensions/jeromegillard-map/pin-icon-parking.png',
                    iconSize: [20, 20],
                    iconAnchor: [10, 20],
                    popupAnchor: [0, -10]
                  });
                  // Get bounds of polygon
                  var bounds = layer.getBounds();
                  // Get center of bounds
                  var center = bounds.getCenter();
                  // Use center to put marker on map
                  var marker = L.marker(center,
                    {icon: parkingIcon}
                    ).addTo(map);
                  }
              }

              if(popupContent !== ''){
                layer.bindPopup(popupContent);
              }
            }
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
  $('div.PostStream-item[data-id="'+pid+'"] .bbcode-map, div.Pages-container .bbcode-map').each(function( i ) {
    let location = $(this).data('mapLocation');
    let title = $(this).data('mapTitle');
    let desc = $(this).data('mapDesc');
    let mapConf = getMapConfig(
      $(this).data('mapProvider'),
      $(this).data('mapStyle'),
      $(this).data('mapZoom')
    )
    //console.log(mapConf, $(this).data('mapStyle'));
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
          getTileLayer(mapConf).addTo(map);
          map.setView([json[0].lat, json[0].lon], mapConf.zoom);

          // If there's a title or a desc, create marker and assign to map.
          if(title || desc){

            let pIcon = L.icon({
              iconUrl: '/assets/extensions/jeromegillard-map/pin-icon-start.png',
              iconSize: [33, 45],
              iconAnchor: [16, 45],
              popupAnchor: [0, -22]
            });

            let popupContent = '';

            if (title) {
              popupContent += '<strong>'+title+'</strong>';
            }
            if (desc) {
              popupContent += '<br/>'+desc;
            }

            // put marker on map
            let marker = L.marker([json[0].lat, json[0].lon], { icon: pIcon }).addTo(map);
            if(popupContent){
              marker.bindPopup(popupContent).openPopup();
            }
          }
        });
    }
  });
};
