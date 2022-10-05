/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
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

/***/ "./src/forum/components/File.js":
/*!**************************************!*\
  !*** ./src/forum/components/File.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ File)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/Model */ "flarum/common/Model");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Model__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_utils_mixin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/utils/mixin */ "flarum/common/utils/mixin");
/* harmony import */ var flarum_common_utils_mixin__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_mixin__WEBPACK_IMPORTED_MODULE_3__);





var File = /*#__PURE__*/function (_mixin) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(File, _mixin);

  function File() {
    return _mixin.apply(this, arguments) || this;
  }

  var _proto = File.prototype;

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
      case 'jeromegillard-osm':
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

  return File;
}(flarum_common_utils_mixin__WEBPACK_IMPORTED_MODULE_3___default()((flarum_common_Model__WEBPACK_IMPORTED_MODULE_2___default()), {
  baseName: flarum_common_Model__WEBPACK_IMPORTED_MODULE_2___default().attribute('baseName'),
  path: flarum_common_Model__WEBPACK_IMPORTED_MODULE_2___default().attribute('path'),
  url: flarum_common_Model__WEBPACK_IMPORTED_MODULE_2___default().attribute('url'),
  type: flarum_common_Model__WEBPACK_IMPORTED_MODULE_2___default().attribute('type'),
  size: flarum_common_Model__WEBPACK_IMPORTED_MODULE_2___default().attribute('size'),
  humanSize: flarum_common_Model__WEBPACK_IMPORTED_MODULE_2___default().attribute('humanSize'),
  createdAt: flarum_common_Model__WEBPACK_IMPORTED_MODULE_2___default().attribute('createdAt'),
  uuid: flarum_common_Model__WEBPACK_IMPORTED_MODULE_2___default().attribute('uuid'),
  tag: flarum_common_Model__WEBPACK_IMPORTED_MODULE_2___default().attribute('tag'),
  hidden: flarum_common_Model__WEBPACK_IMPORTED_MODULE_2___default().attribute('hidden'),
  cuuid: flarum_common_Model__WEBPACK_IMPORTED_MODULE_2___default().attribute('cuuid')
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
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_File__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/File */ "./src/forum/components/File.js");




flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('jeromegillard/osm', function () {
  (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().store.models.files) = _components_File__WEBPACK_IMPORTED_MODULE_3__["default"];
});
(0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_2__.extend)((flarum_components_Post__WEBPACK_IMPORTED_MODULE_1___default().prototype), 'oncreate', function () {
  var _app$forum$attribute, _app$forum$attribute2, _app$forum$attribute3, _app$forum$attribute4, _app$forum$attribute5;

  this.postId = this.attrs.post.id();
  this.tilesProvider = (_app$forum$attribute = flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute("tilesProvider")) != null ? _app$forum$attribute : 'osm';
  this.currentKey = '';
  this.currentStyle = '';

  switch (this.tilesProvider) {
    case "mapbox":
      this.currentKey = (_app$forum$attribute2 = flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute("mapbox.key")) != null ? _app$forum$attribute2 : '';
      this.currentStyle = (_app$forum$attribute3 = flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute("mapbox.style")) != null ? _app$forum$attribute3 : 'mapbox/light-v9';
      this.tileLayerURL = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}@2x?access_token={key}';
      this.attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, ' + '© <a href="https://www.mapbox.com/">Mapbox</a>';
      break;

    case "thunderforest":
      this.currentKey = (_app$forum$attribute4 = flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute("thunderforest.key")) != null ? _app$forum$attribute4 : '';
      this.currentStyle = (_app$forum$attribute5 = flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute("thunderforest.style")) != null ? _app$forum$attribute5 : 'atlas';
      this.tileLayerURL = 'https://tile.thunderforest.com/{id}/{z}/{x}/{y}.png?apikey={key}';
      this.attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, ' + '© <a href="https://www.thunderforest.com/">Thunderforest</a>';
      break;

    default:
      this.tileLayerURL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
      this.attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
  } // copy this for usage within .each()


  var so = this; //for each gpx file in this post, loop and map

  this.$('.osmFile').each(function (i) {
    // grab the uploaded gpx file's UUID and url
    var uuid = $(this).data('fofUploadDownloadUuid');
    var nid = 'map-' + so.postId + i + '-' + uuid;
    var url = flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute('apiUrl') + '/fof/download';
    url += '/' + uuid;
    url += '/' + so.postId;
    url += '/' + (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().session.csrfToken);
    var fileExt = $(this).data('mapUrl').split('.').pop().toLowerCase();
    /*  change the template rendering to insert a new id to the map element.
      * this allows us to have an unique div id even if a same file is displayed
      * more than one time
    */

    var oldNode = document.getElementById('map--' + uuid);
    var newNode = oldNode.cloneNode(true);
    newNode.id = nid;
    oldNode.parentNode.replaceChild(newNode, oldNode); // Get the map element

    var map = L.map(nid);
    map.addControl(new L.Control.Fullscreen()); // Set the tiles provider

    new L.tileLayer(so.tileLayerURL, {
      key: so.currentKey,
      maxZoom: 18,
      attribution: so.attribution,
      id: so.currentStyle,
      tileSize: 512,
      zoomOffset: -1,
      detectRetina: true
    }).addTo(map);

    if (fileExt == 'gpx') {
      // Display the GPX file in it thanks to https://github.com/mpetazzoni/leaflet-gpx
      new L.GPX(url, {
        async: true,
        marker_options: {
          startIconUrl: '/assets/extensions/jeromegillard-osm/pin-icon-start.png',
          endIconUrl: '/assets/extensions/jeromegillard-osm/pin-icon-end.png',
          shadowUrl: '/assets/extensions/jeromegillard-osm/pin-shadow.png',
          wptIconUrls: {
            '': '/assets/extensions/jeromegillard-osm/default-waypoint.png',
            'Geocache Found': '/assets/extensions/jeromegillard-osm/geocache.png',
            'Park': '/assets/extensions/jeromegillard-osm/tree.png'
          }
        }
      }).on('loaded', function (e) {
        map.fitBounds(e.target.getBounds());
      }).addTo(map);
    } else if (fileExt == 'geojson') {
      fetch(url).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json);
        var geoJSONLayer = L.geoJSON([json], {
          style: function style(feature) {
            if (feature.properties && feature.properties.colour) {
              return {
                color: feature.properties.colour,
                weight: 3,
                opacity: 1
              };
            }
          } //onEachFeature: onEachFeature,

        }).addTo(map);
        map.setView(geoJSONLayer.getBounds().getCenter(), 13);
      });
    } else {
      map.setView([51.505, -0.09], 13);
    }
  });
});

/***/ }),

/***/ "flarum/app":
/*!********************************************!*\
  !*** external "flarum.core.compat['app']" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['app'];

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