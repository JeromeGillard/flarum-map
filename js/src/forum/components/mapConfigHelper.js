import app from 'flarum/forum/app';

export function getMapConfig(o_tilesProvider, o_style, o_zoom) {
    let tilesProvider = app.forum.attribute("tilesProvider")||'osm';
    let currentStyle;
    let currentKey;
    let tileLayerURL;
    let zoom = app.forum.attribute("zoom")||13;
    let attribution;
    let type = 'raster';

    if(o_tilesProvider &&
        o_tilesProvider === 'mapbox' ||
        o_tilesProvider === 'thunderforest' ||
        o_tilesProvider === 'osm') {
            tilesProvider = o_tilesProvider;
    }

    switch(tilesProvider){
        case "mapbox":
          currentKey = app.forum.attribute("mapbox.key")||'';
          currentStyle = app.forum.attribute("mapbox.style")||'mapbox/light-v9';
          tileLayerURL = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}@2x?access_token={key}';
          attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, ' +
          '© <a href="https://www.mapbox.com/">Mapbox</a>';
          break;
        case "thunderforest":
          currentKey = app.forum.attribute("thunderforest.key")||'';
          currentStyle = app.forum.attribute("thunderforest.style")||'atlas';
          tileLayerURL = 'https://tile.thunderforest.com/{id}/{z}/{x}/{y}.png?apikey={key}';
          attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, ' +
          '© <a href="https://www.thunderforest.com/">Thunderforest</a>';
          break;
        case "maptiler":
          type = 'gl';
          currentKey = app.forum.attribute("maptiler.key")||'';
          currentStyle = app.forum.attribute("maptiler.style")||'basic-v2';
          tileLayerURL = 'https://api.maptiler.com/maps/'+currentStyle+'/style.json?key='+currentKey;
          attribution = "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e";
          break;
        default:
          tileLayerURL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
          attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
      }

    if(o_style){
        switch(tilesProvider){
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
                break;
        }
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
                defaultLocation: [51.505, -0.09], "type": type };
  };

export function getTileLayer(mapConf){
  //console.log(mapConf);
  if(mapConf && mapConf.tilesProvider){
    // Allow SVG tiles from 'gl' providers (MapTiler for instance)
    if(mapConf.type == 'gl'){
      return new L.mapboxGL({
        attribution: mapConf.attribution,
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
          detectRetina: mapConf.detectRetina
        });
    }
  }
};
