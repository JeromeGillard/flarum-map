/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/common/index.ts":
/*!*****************************!*\
  !*** ./src/common/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/app */ "flarum/common/app");
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_app__WEBPACK_IMPORTED_MODULE_0__);

flarum_common_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('jeromegillard/osm', function () {
  console.log('[jeromegillard/osm] Hello, forum and admin!');
});

/***/ }),

/***/ "./src/forum/components/leaflet.ChineseTmsProviders.js":
/*!*************************************************************!*\
  !*** ./src/forum/components/leaflet.ChineseTmsProviders.js ***!
  \*************************************************************/
/***/ (() => {

// this L.CRS.Baidu from https://github.com/muyao1987/leaflet-tileLayer-baidugaode/blob/master/src/tileLayer.baidu.js
if (L.Proj) {
  L.CRS.Baidu = new L.Proj.CRS('EPSG:900913', '+proj=merc +a=6378206 +b=6356584.314245179 +lat_ts=0.0 +lon_0=0.0 +x_0=0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs', {
    resolutions: function () {
      var level = 19;
      var res = [];
      res[0] = Math.pow(2, 18);

      for (var i = 1; i < level; i++) {
        res[i] = Math.pow(2, 18 - i);
      }

      return res;
    }(),
    origin: [0, 0],
    bounds: L.bounds([20037508.342789244, 0], [0, 20037508.342789244])
  });
}

L.TileLayer.ChinaProvider = L.TileLayer.extend({
  initialize: function initialize(type, options) {
    // (type, Object)
    var providers = L.TileLayer.ChinaProvider.providers;
    options = options || {};
    var parts = type.split('.');
    var providerName = parts[0];
    var mapName = parts[1];
    var mapType = parts[2];
    var url = providers[providerName][mapName][mapType];
    options.subdomains = providers[providerName].Subdomains;
    options.key = options.key || providers[providerName].key;

    if ('tms' in providers[providerName]) {
      options.tms = providers[providerName]['tms'];
    }

    L.TileLayer.prototype.initialize.call(this, url, options);
  },
  getTileUrl: function getTileUrl(coords) {
    var data = {
      s: this._getSubdomain(coords),
      x: coords.x,
      y: coords.y,
      z: this._getZoomForUrl()
    };

    if (this._map && !this._map.options.crs.infinite) {
      var invertedY = this._globalTileRange.max.y - coords.y;

      if (this.options.tms) {
        data['y'] = invertedY;
      }

      data['-y'] = invertedY;
    }

    data.sx = data.x >> 4;
    data.sy = (1 << data.z) - data.y >> 4;
    return L.Util.template(this._url, L.Util.extend(data, this.options));
  }
});
L.TileLayer.ChinaProvider.providers = {
  TianDiTu: {
    Normal: {
      Map: "//t{s}.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk={key}",
      Annotion: "//t{s}.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk={key}"
    },
    Satellite: {
      Map: "//t{s}.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk={key}",
      Annotion: "//t{s}.tianditu.gov.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk={key}"
    },
    Terrain: {
      Map: "//t{s}.tianditu.gov.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}&tk={key}",
      Annotion: "//t{s}.tianditu.gov.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}&tk={key}"
    },
    Subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    key: "174705aebfe31b79b3587279e211cb9a"
  },
  GaoDe: {
    Normal: {
      Map: '//webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
    },
    Satellite: {
      Map: '//webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
      Annotion: '//webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}'
    },
    Subdomains: ["1", "2", "3", "4"]
  },
  Google: {
    Normal: {
      Map: "//www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
    },
    Satellite: {
      Map: "//www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}",
      Annotion: "//www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}"
    },
    Subdomains: []
  },
  Geoq: {
    Normal: {
      Map: "//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}",
      PurplishBlue: "//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
      Gray: "//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}",
      Warm: "//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}"
    },
    Theme: {
      Hydro: "//thematic.geoq.cn/arcgis/rest/services/ThematicMaps/WorldHydroMap/MapServer/tile/{z}/{y}/{x}"
    },
    Subdomains: []
  },
  OSM: {
    Normal: {
      Map: "//{s}.tile.osm.org/{z}/{x}/{y}.png"
    },
    Subdomains: ['a', 'b', 'c']
  },
  Baidu: {
    Normal: {
      Map: '//online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1'
    },
    Satellite: {
      Map: '//shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46',
      Annotion: '//online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=sl&v=020'
    },
    Subdomains: '0123456789',
    tms: true
  },
  Tencent: {
    Normal: {
      Map: "//rt{s}.map.gtimg.com/tile?z={z}&x={x}&y={-y}&type=vector&styleid=3"
    },
    Satellite: {
      Map: "//p{s}.map.gtimg.com/sateTiles/{z}/{sx}/{sy}/{x}_{-y}.jpg"
    },
    Terrain: {
      Map: "//p{s}.map.gtimg.com/demTiles/{z}/{sx}/{sy}/{x}_{-y}.jpg"
    },
    Subdomains: '0123'
  }
};

L.tileLayer.chinaProvider = function (type, options) {
  return new L.TileLayer.ChinaProvider(type, options);
};

/***/ }),

/***/ "./src/forum/components/mapBBCode.js":
/*!*******************************************!*\
  !*** ./src/forum/components/mapBBCode.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ insertAtCursor)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);


function insertAtCursor(tilesProvider, style, zoom) {
  (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee() {
    var input, pos, front, back, middle;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            input = document.querySelector('textarea.FormControl');
            pos = input.selectionStart;
            front = input.value.substring(0, pos);
            back = input.value.substring(pos, input.value.length);
            middle = "[map provider=" + (tilesProvider != null ? tilesProvider : 'osm') + " style=" + (style != null ? style : 'street') + " zoom=" + (zoom != null ? zoom : 13) + " title='" + app.translator.trans('jeromegillard-map.forum.text_editor.marker_title_placeholder') + "' desc='" + app.translator.trans('jeromegillard-map.forum.text_editor.marker_description_placeholder') + "']" + app.translator.trans('jeromegillard-map.forum.text_editor.location_placeholder') + "[/map]";
            input.value = front + middle + back;
            pos = pos + 1;
            input.selectionStart = pos;
            input.selectionEnd = pos;
            input.focus();

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }))();
}

/***/ }),

/***/ "./src/forum/components/mapConfigHelper.js":
/*!*************************************************!*\
  !*** ./src/forum/components/mapConfigHelper.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createMap": () => (/* binding */ createMap),
/* harmony export */   "getMapConfig": () => (/* binding */ getMapConfig),
/* harmony export */   "getTileLayer": () => (/* binding */ getTileLayer)
/* harmony export */ });
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _leaflet_ChineseTmsProviders_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./leaflet.ChineseTmsProviders.js */ "./src/forum/components/leaflet.ChineseTmsProviders.js");
/* harmony import */ var _leaflet_ChineseTmsProviders_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_leaflet_ChineseTmsProviders_js__WEBPACK_IMPORTED_MODULE_1__);


function getMapConfig(o_tilesProvider, o_style, o_zoom) {
  var tilesProvider = flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute("tilesProvider") || 'osm';
  var currentStyle;
  var currentKey;
  var tileLayerURL;
  var zoom = flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute("zoom") || 13;
  var attribution;
  var type = 'raster';
  var subdomains = [];

  if (o_tilesProvider && o_tilesProvider === 'mapbox' || o_tilesProvider === 'thunderforest' || o_tilesProvider === 'osm' || o_tilesProvider === 'gaode' || o_tilesProvider === 'tencent') {
    tilesProvider = o_tilesProvider;
  }

  if (o_style) {
    switch (tilesProvider) {
      case 'maptiler':
        if (o_style == 'basic-v2' || o_style == 'basic-4326' || o_style == 'bright-v2' || o_style == 'openstreetmap' || o_style == 'outdoor' || o_style == 'pastel' || o_style == 'hybrid' || o_style == 'streets-v2' || o_style == 'toner' || o_style == 'topo' || o_style == 'topographique' || o_style == 'voyager' || o_style == 'winter') {
          currentStyle = o_style;
        } else {
          console.log("Unknown style", o_style);
        }

        break;

      case 'mapbox':
        if (o_style === 'mapbox/streets-v11' || o_style === 'mapbox/outdoors-v11' || o_style === 'mapbox/light-v10' || o_style === 'mapbox/dark-v10' || o_style === 'mapbox/satellite-v9' || o_style === 'mapbox/satellite-streets-v11' || o_style === 'mapbox/navigation-day-v1' || o_style === 'mapbox/streets-v11' || o_style === 'mapbox/navigation-night-v1') {
          currentStyle = o_style;
        } else {
          console.log("Unknown style", o_style);
        }

        break;

      case 'thunderforest':
        if (o_style === 'cycle' || o_style === 'transport' || o_style === 'landscape' || o_style === 'outdoors' || o_style === 'transport-dark9' || o_style === 'spinal-map' || o_style === 'pioneer' || o_style === 'mobile-atlas' || o_style === 'neighbourhood' || o_style === 'atlas') {
          currentStyle = o_style;
        } else {
          console.log("Unknown style", o_style);
        }

        break;

      case 'gaode':
        if (o_style === 'Normal.Map' || o_style == 'Satellite.Map') {
          currentStyle = o_style;
        } else {
          console.log("Unknown style", o_style);
        }

        break;

      case 'tencent':
        if (o_style === 'Normal.Map' || o_style === 'Satellite.Map' || o_style === 'Terrain.Map') {
          currentStyle = o_style;
        } else {
          console.log("Unknown style", o_style);
        }

    }
  }

  switch (tilesProvider) {
    case "mapbox":
      type = 'gl';
      currentKey = flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute("mapbox.key") || '';
      currentStyle = currentStyle || flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute("mapbox.style") || 'mapbox/light-v9';
      tileLayerURL = 'mapbox://styles/' + currentStyle;
      attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, ' + '© <a href="https://www.mapbox.com/">Mapbox</a>';
      break;

    case "thunderforest":
      type: 'gl';

      currentKey = flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute("thunderforest.key") || '';
      currentStyle = currentStyle || flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute("thunderforest.style") || 'atlas';
      tileLayerURL = 'https://tile.thunderforest.com/{id}/{z}/{x}/{y}.png?apikey={key}';
      attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, ' + '© <a href="https://www.thunderforest.com/">Thunderforest</a>';
      break;

    case "maptiler":
      type = 'gl';
      currentKey = flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute("maptiler.key") || '';
      currentStyle = currentStyle || flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute("maptiler.style") || 'basic-v2';
      tileLayerURL = 'https://api.maptiler.com/maps/' + currentStyle + '/style.json?key=' + currentKey;
      attribution = "<a href=\"https://www.maptiler.com/copyright/\" target=\"_blank\">&copy; MapTiler</a> <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">&copy; OpenStreetMap contributors</a>";
      break;

    case "gaode":
      type = 'cn';
      currentStyle = currentStyle || flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute("tencent.style") || 'Normal.Map';
      tileLayerURL = "GaoDe." + currentStyle;
      attribution = '&copy; <a href="https://www.autonavi.com">autonavi</a>';
      break;

    case "tencent":
      type = 'cn';
      currentStyle = currentStyle || flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute("tencent.style") || 'Normal.Map';
      tileLayerURL = "Tencent." + currentStyle;
      attribution = '&copy; <a href="https://map.qq.com/">Tencent</a>';
      break;

    default:
      tileLayerURL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
      attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
    // tileLayerURL = 'https://{s}.tile.osm.org/{z}/{x}/{y}.png",
    // subdomains = ['a', 'b', 'c']
  }

  if (o_zoom) {
    zoom = o_zoom;
  }

  if (zoom < 0 || zoom > 18) {
    zoom = 13;
  }

  return {
    "tilesProvider": tilesProvider,
    "attribution": attribution,
    "currentStyle": currentStyle,
    "currentKey": currentKey,
    "tileLayerURL": tileLayerURL,
    "zoom": zoom,
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
    detectRetina: true,
    defaultLocation: [51.505, -0.09],
    "type": type,
    "subdomains": subdomains
  };
}
;
function getTileLayer(mapConf) {
  //console.log(mapConf);
  if (mapConf && mapConf.tilesProvider) {
    // Allow SVG tiles from 'gl' providers (MapTiler for instance)
    if (mapConf.type === 'gl') {
      return new L.mapboxGL({
        attribution: mapConf.attribution,
        accessToken: mapConf.currentKey,
        style: mapConf.tileLayerURL
      });
    } else if (mapConf.type === 'cn') {
      mapConf.key = mapConf.currentKey;
      return new L.tileLayer.chinaProvider(mapConf.tileLayerURL, mapConf);
    } else {
      // Raster tiles
      return new L.tileLayer(mapConf.tileLayerURL, {
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
}
;
function createMap(pid) {
  var so = {};
  so.postId = pid;
  so.mapConf = getMapConfig(); //for each gpx file in this post, loop and map

  $('div.PostStream-item[data-id="' + pid + '"] .mapFile-container, div.Pages-container .mapFile-container').each(function (i) {
    // grab the uploaded gpx file's UUID and url
    var uuid = $(this).children('.mapFile').data('fofUploadDownloadUuid');
    var nid = 'map-' + so.postId + i + '-' + uuid;
    var url = flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute('apiUrl') + '/fof/download';
    url += '/' + uuid;
    url += '/' + so.postId;
    url += '/' + (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().session.csrfToken);
    var fileExt = $(this).children('.mapFile').data('mapUrl').split('.').pop().toLowerCase();
    /*  change the template rendering to insert a new id to the map element.
      * this allows us to have an unique div id even if a same file is displayed
      * more than one time
    */

    $(this).children('.mapFile-placeholder').prop('id', nid); // Get the map element

    var map = L.map(nid);
    map.addControl(new L.Control.Fullscreen()); // Set the tiles provider

    getTileLayer(so.mapConf).addTo(map);

    if (fileExt == 'gpx') {
      // Display the GPX file in it thanks to https://github.com/mpetazzoni/leaflet-gpx
      new L.GPX(url, {
        async: true,
        marker_options: {
          startIconUrl: '/assets/extensions/jeromegillard-map/pin-icon-start.png',
          endIconUrl: '/assets/extensions/jeromegillard-map/pin-icon-end.png',
          shadowUrl: '/assets/extensions/jeromegillard-map/pin-shadow.png',
          wptIconUrls: {
            '': '/assets/extensions/jeromegillard-map/default-waypoint.png',
            'Geocache Found': '/assets/extensions/jeromegillard-map/geocache.png',
            'Park': '/assets/extensions/jeromegillard-map/tree.png'
          }
        }
      }).on('loaded', function (e) {
        map.fitBounds(e.target.getBounds());
      }).addTo(map);
    } else if (fileExt === 'json' || fileExt === 'geojson') {
      fetch(url).then(function (response) {
        return response.json();
      }).then(function (json) {
        function onEachFeature(feature, layer) {
          if (feature && feature.properties) {
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
                }); // Get bounds of polygon

                var bounds = layer.getBounds(); // Get center of bounds

                var center = bounds.getCenter(); // Use center to put marker on map

                var marker = L.marker(center, {
                  icon: parkingIcon
                }).addTo(map);
              }
            }

            if (popupContent !== '') {
              layer.bindPopup(popupContent);
            }
          }
        }

        var geoJSONLayer = L.geoJSON([json], {
          style: function style(feature) {
            if (feature.properties && feature.properties.colour) {
              return {
                color: feature.properties.colour,
                weight: 3,
                opacity: 1
              };
            }
          },
          onEachFeature: onEachFeature
        }).addTo(map);
        map.fitBounds(geoJSONLayer.getBounds());
      });
    } else {
      map.setView(so.mapConf.defaultLocation, so.mapConf.zoom);
    }
  }); // for each map location from BBCode, loop and map

  $('div.PostStream-item[data-id="' + pid + '"] .bbcode-map, div.Pages-container .bbcode-map').each(function (i) {
    var location = $(this).data('mapLocation');
    var title = $(this).data('mapTitle');
    var desc = $(this).data('mapDesc');
    var mapConf = getMapConfig($(this).data('mapProvider'), $(this).data('mapStyle'), $(this).data('mapZoom')); //console.log(mapConf, $(this).data('mapStyle'));

    var nid = 'map-' + Math.floor(Math.random() * 1000);
    $(this).prop('id', nid);

    if (location) {
      // resolve location as coordinates
      fetch("https://nominatim.openstreetmap.org/search?q=" + location + "&format=json").then(function (response) {
        return response.json();
      }).then(function (json) {
        // Get the map element
        var map = L.map(nid);
        map.addControl(new L.Control.Fullscreen()); // Set the tiles provider

        getTileLayer(mapConf).addTo(map);
        map.setView([json[0].lat, json[0].lon], mapConf.zoom); // If there's a title or a desc, create marker and assign to map.

        if (title || desc) {
          var pIcon = L.icon({
            iconUrl: '/assets/extensions/jeromegillard-map/pin-icon-start.png',
            iconSize: [33, 45],
            iconAnchor: [16, 45],
            popupAnchor: [0, -22]
          });
          var popupContent = '';

          if (title) {
            popupContent += '<strong>' + title + '</strong>';
          }

          if (desc) {
            popupContent += '<br/>' + desc;
          } // put marker on map


          var marker = L.marker([json[0].lat, json[0].lon], {
            icon: pIcon
          }).addTo(map);

          if (popupContent) {
            marker.bindPopup(popupContent).openPopup();
          }
        }
      });
    }
  });
}
;

/***/ }),

/***/ "./src/forum/components/mapFile.js":
/*!*****************************************!*\
  !*** ./src/forum/components/mapFile.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mapFile)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Model */ "flarum/common/Model");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_utils_mixin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/utils/mixin */ "flarum/common/utils/mixin");
/* harmony import */ var flarum_common_utils_mixin__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_mixin__WEBPACK_IMPORTED_MODULE_2__);




var mapFile = /*#__PURE__*/function (_mixin) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(mapFile, _mixin);

  function mapFile() {
    return _mixin.apply(this, arguments) || this;
  }

  var _proto = mapFile.prototype;

  /**
   * Use FoF Uploads endpoint
   */
  _proto.apiEndpoint = function apiEndpoint() {
    return '/fof/uploads' + (this.exists ? '/' + this.data.id : '');
  }
  /**
   * Generate bbcode for this file
   */
  ;

  _proto.bbcode = function bbcode() {
    //console.log('checking', this.tag())
    switch (this.tag()) {
      case 'jeromegillard-map':
        return "[upl-file uuid=" + this.uuid() + " size=" + this.humanSize() + " url=" + this.url() + "]" + this.baseName() + "[/upl-file]";
      // File

      case 'file':
        return "[upl-file uuid=" + this.uuid() + " size=" + this.humanSize() + "]" + this.baseName() + "[/upl-this]";
      // Image template

      case 'image':
        return "[upl-image uuid=" + this.uuid() + " size=" + this.humanSize() + " url=" + this.url() + "]" + this.baseName() + "[/upl-image]";
      // Image preview

      case 'image-preview':
        return "[upl-image-preview url=" + this.url() + "]";
      // 'just-url' or unknown

      default:
        return this.url();
    }
  };

  return mapFile;
}(flarum_common_utils_mixin__WEBPACK_IMPORTED_MODULE_2___default()((flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default()), {
  baseName: flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('baseName'),
  path: flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('path'),
  url: flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('url'),
  type: flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('type'),
  size: flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('size'),
  humanSize: flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('humanSize'),
  createdAt: flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('createdAt'),
  uuid: flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('uuid'),
  tag: flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('tag'),
  hidden: flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('hidden')
}));



/***/ }),

/***/ "./src/forum/index.js":
/*!****************************!*\
  !*** ./src/forum/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_components_Post__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Post */ "flarum/components/Post");
/* harmony import */ var flarum_components_Post__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Post__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Page */ "flarum/components/Page");
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Page__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_TextEditor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/TextEditor */ "flarum/common/components/TextEditor");
/* harmony import */ var flarum_common_components_TextEditor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_TextEditor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_components_TextEditorButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/components/TextEditorButton */ "flarum/common/components/TextEditorButton");
/* harmony import */ var flarum_common_components_TextEditorButton__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_TextEditorButton__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_mapFile__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/mapFile */ "./src/forum/components/mapFile.js");
/* harmony import */ var _components_mapBBCode__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/mapBBCode */ "./src/forum/components/mapBBCode.js");
/* harmony import */ var _components_mapConfigHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/mapConfigHelper */ "./src/forum/components/mapConfigHelper.js");









flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('jeromegillard/osm', function () {
  (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().store.models.files) = _components_mapFile__WEBPACK_IMPORTED_MODULE_6__["default"];
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_3__.extend)((flarum_common_components_TextEditor__WEBPACK_IMPORTED_MODULE_4___default().prototype), 'toolbarItems', function (items) {
    var mapConf = (0,_components_mapConfigHelper__WEBPACK_IMPORTED_MODULE_8__.getMapConfig)();
    items.add('bbcode', m((flarum_common_components_TextEditorButton__WEBPACK_IMPORTED_MODULE_5___default()), {
      onclick: function onclick() {
        return (0,_components_mapBBCode__WEBPACK_IMPORTED_MODULE_7__["default"])(mapConf.tilesProvider, mapConf.currentStyle, mapConf.zoom);
      },
      icon: 'fas fa-map'
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('jeromegillard-map.forum.text_editor.bbcode_tooltip')));
  });
}); // Render maps in posts

(0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_3__.extend)((flarum_components_Post__WEBPACK_IMPORTED_MODULE_1___default().prototype), 'oncreate', function () {
  (0,_components_mapConfigHelper__WEBPACK_IMPORTED_MODULE_8__.createMap)(this.attrs.post.id());
}); // Render maps in pages (fof/pages)

(0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_3__.extend)((flarum_components_Page__WEBPACK_IMPORTED_MODULE_2___default().prototype), 'oncreate', function () {
  var pid = this.attrs.id;

  if (this.attrs.routeName === 'page') {
    // Wait for the post to be rendered. Anyone has a better event?
    // With fof/links, when a user browse from a post to the page, there's no event triggered
    setTimeout(_components_mapConfigHelper__WEBPACK_IMPORTED_MODULE_8__.createMap, 500, pid);
  }
});

/***/ }),

/***/ "flarum/common/Model":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['common/Model']" ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/Model'];

/***/ }),

/***/ "flarum/common/app":
/*!***************************************************!*\
  !*** external "flarum.core.compat['common/app']" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/app'];

/***/ }),

/***/ "flarum/common/components/TextEditor":
/*!*********************************************************************!*\
  !*** external "flarum.core.compat['common/components/TextEditor']" ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/TextEditor'];

/***/ }),

/***/ "flarum/common/components/TextEditorButton":
/*!***************************************************************************!*\
  !*** external "flarum.core.compat['common/components/TextEditorButton']" ***!
  \***************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/TextEditorButton'];

/***/ }),

/***/ "flarum/common/extend":
/*!******************************************************!*\
  !*** external "flarum.core.compat['common/extend']" ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/extend'];

/***/ }),

/***/ "flarum/common/utils/mixin":
/*!***********************************************************!*\
  !*** external "flarum.core.compat['common/utils/mixin']" ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/utils/mixin'];

/***/ }),

/***/ "flarum/components/Page":
/*!********************************************************!*\
  !*** external "flarum.core.compat['components/Page']" ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/Page'];

/***/ }),

/***/ "flarum/components/Post":
/*!********************************************************!*\
  !*** external "flarum.core.compat['components/Post']" ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/Post'];

/***/ }),

/***/ "flarum/forum/app":
/*!**************************************************!*\
  !*** external "flarum.core.compat['forum/app']" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/app'];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"]);

function _regeneratorRuntime() {
  "use strict";
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return exports;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");

        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }

        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);

          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }

          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  exports.wrap = wrap;
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if ("throw" !== record.type) {
        var result = record.arg,
            value = result.value;
        return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }

      reject(record.arg);
    }

    var previousPromise;

    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          for (; ++i < iterable.length;) {
            if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
          }

          return next.value = undefined, next.done = !0, next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {
        "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      }
    },
    stop: function stop() {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) throw exception;
      var context = this;

      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
            record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/***/ ((module) => {

function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}

module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// TODO(Babel 8): Remove this file.
var runtime = __webpack_require__(/*! ../helpers/regeneratorRuntime */ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js")();

module.exports = runtime; // Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _asyncToGenerator)
/* harmony export */ });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _inheritsLoose)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(subClass, superClass);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _setPrototypeOf)
/* harmony export */ });
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./forum.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/common */ "./src/common/index.ts");
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.js");


})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=forum.js.map