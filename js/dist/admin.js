/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin/index.js":
/*!****************************!*\
  !*** ./src/admin/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__);

flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('jeromegillard/osm', function () {
  var _app$data$settings$je;

  var currentTilesProvider = (_app$data$settings$je = (flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().data.settings["jeromegillard-osm.tilesProvider"])) != null ? _app$data$settings$je : 'osm';
  flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().extensionData["for"]('jeromegillard-osm') // Tile provider selection
  .registerSetting({
    setting: 'jeromegillard-osm.tilesProvider',
    label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('jeromegillard-osm.admin.settings.tiles_provider.label'),
    help: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('jeromegillard-osm.admin.settings.tiles_provider.help'),
    type: 'select',
    options: {
      'osm': 'OpenStreetMap',
      'mapbox': 'Mapbox',
      'thunderforest': 'Thunderforest'
    },
    "default": 'osm',
    className: 'select-tilesProvider'
  }, 100) // Default zoom
  .registerSetting({
    setting: 'jeromegillard-osm.zoom',
    label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('jeromegillard-osm.admin.settings.zoom.label'),
    help: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('jeromegillard-osm.admin.settings.zoom.help'),
    type: 'text',
    className: 'zoom-setting',
    placeholder: 13
  }, 90) // OpenStreetMap
  .registerSetting({
    label: 'OpenStreetMap',
    help: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('jeromegillard-osm.admin.settings.osm.help', {
      a: m("a", {
        href: "https://operations.osmfoundation.org/policies/tiles",
        target: "_blank"
      })
    }),
    type: 'hidden'
  }, 80) // Mapbox key
  .registerSetting({
    setting: 'jeromegillard-osm.mapbox.key',
    label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('jeromegillard-osm.admin.settings.mapbox.label'),
    help: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('jeromegillard-osm.admin.settings.mapbox.help', {
      a: m("a", {
        href: "https://www.mapbox.com",
        target: "_blank"
      }),
      b: m("a", {
        href: "https://docs.mapbox.com/help/how-mapbox-works/attribution/"
      })
    }),
    type: 'text',
    className: 'mapbox-setting toggle-setting-block'
  }, 71) // Mapbox styles (https://docs.mapbox.com/api/maps/styles/#mapbox-styles)
  .registerSetting({
    setting: 'jeromegillard-osm.mapbox.style',
    label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('jeromegillard-osm.admin.settings.style.label', {
      provider: 'Mapbox'
    }),
    help: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('jeromegillard-osm.admin.settings.style.help', {
      a: m("a", {
        href: "https://docs.mapbox.com/api/maps/styles/#mapbox-styles",
        target: "_blank"
      })
    }),
    type: 'select',
    options: {
      'mapbox/streets-v11': 'Streets',
      'mapbox/outdoors-v11': 'Outdoors',
      'mapbox/light-v10': 'Light',
      'mapbox/dark-v10': 'Dark',
      'mapbox/satellite-v9': 'Satelite',
      'mapbox/satellite-streets-v11': 'Satelite streets',
      'mapbox/navigation-day-v1': 'Navigation day',
      'mapbox/navigation-night-v1': 'Navigation night'
    },
    "default": 'mapbox/streets-v11',
    className: 'mapbox-setting mapbox-style toggle-setting-block'
  }, 70) // Thunderforest key https://www.thunderforest.com/terms/
  .registerSetting({
    setting: 'jeromegillard-osm.thunderforest.key',
    label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('jeromegillard-osm.admin.settings.thunderforest.label'),
    help: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('jeromegillard-osm.admin.settings.thunderforest.help', {
      a: m("a", {
        href: "https://www.thunderforest.com",
        target: "_blank"
      }),
      b: m("a", {
        href: "https://www.thunderforest.com/terms/",
        target: "_blank"
      })
    }),
    type: 'text',
    className: 'thunderforest-setting toggle-setting-block'
  }, 61) // Thunderforest style
  .registerSetting({
    setting: 'jeromegillard-osm.thunderforest.style',
    label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('jeromegillard-osm.admin.settings.style.label', {
      provider: 'Thunderforest'
    }),
    help: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('jeromegillard-osm.admin.settings.style.help', {
      a: m("a", {
        href: "https://www.thunderforest.com/maps/",
        target: "_blank"
      })
    }),
    type: 'select',
    options: {
      'cycle': 'cycle',
      'transport': 'transport',
      'landscape': 'landscape',
      'outdoors': 'outdoors',
      'transport-dark': 'transport-dark',
      'spinal-map': 'spinal-map',
      'pioneer': 'pioneer',
      'mobile-atlas': 'mobile-atlas',
      'neighbourhood': 'neighbourhood',
      'atlas': 'atlas'
    },
    "default": 'atlas',
    className: 'thunderforest-setting thunderforest-style toggle-setting-block'
  }, 60); // TODO: add openmaptiles https://openmaptiles.org/styles/
});

/***/ }),

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

/***/ "flarum/admin/app":
/*!**************************************************!*\
  !*** external "flarum.core.compat['admin/app']" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['admin/app'];

/***/ }),

/***/ "flarum/common/app":
/*!***************************************************!*\
  !*** external "flarum.core.compat['common/app']" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/app'];

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
  !*** ./admin.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/common */ "./src/common/index.ts");
/* harmony import */ var _src_admin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/admin */ "./src/admin/index.js");


})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=admin.js.map