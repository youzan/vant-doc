module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(7)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/ZanDoc.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var ZanDoc_defaultExport = ({
  name: 'zan-doc',

  props: {
    config: {
      type: Object,
      required: true
    },
    simulator: String
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-bc62f932","hasScoped":false}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/ZanDoc.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "zan-doc"
  }, [_c('zan-doc-header', {
    attrs: {
      "nav": _vm.config.header,
      "active": "移动端"
    }
  }), _vm._v(" "), _c('zan-doc-container', {
    attrs: {
      "hasSimulator": !!_vm.simulator
    }
  }, [_c('zan-doc-nav', {
    attrs: {
      "navConfig": _vm.config.nav,
      "base": "/component"
    }
  }), _vm._v(" "), _c('zan-doc-content', [_vm._t("default"), _vm._v(" "), _c('zan-doc-footer-nav', {
    attrs: {
      "navConfig": _vm.config.nav
    }
  })], 2)], 1), _vm._v(" "), (_vm.simulator) ? _c('zan-doc-simulator', {
    attrs: {
      "src": _vm.simulator
    }
  }) : _vm._e(), _vm._v(" "), _c('zan-doc-footer', {
    attrs: {
      "config": _vm.config.footer
    }
  })], 1)
}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var src_ZanDoc_defaultExport = (esExports);
// CONCATENATED MODULE: ./src/ZanDoc.vue
function injectStyle (ssrContext) {
  __webpack_require__(5)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  ZanDoc_defaultExport,
  src_ZanDoc_defaultExport,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var __src_ZanDoc_defaultExport = (Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/component/NavLink.vue
//
//
//
//
//
//

/* harmony default export */ var NavLink_defaultExport = ({
  name: 'zan-doc-nav-link',
  props: ['base', 'item']
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-489e4976","hasScoped":false}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/component/NavLink.vue
var NavLink_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.item.path) ? _c('router-link', {
    attrs: {
      "active-class": "active",
      "to": _vm.base + _vm.item.path
    },
    domProps: {
      "textContent": _vm._s(_vm.item.title || _vm.item.name)
    }
  }) : (_vm.item.link) ? _c('a', {
    attrs: {
      "href": _vm.item.link
    },
    domProps: {
      "textContent": _vm._s(_vm.item.title || _vm.item.name)
    }
  }) : _c('a', {
    domProps: {
      "textContent": _vm._s(_vm.item.title || _vm.item.name)
    }
  })
}
var NavLink_staticRenderFns = []
var NavLink_esExports = { render: NavLink_render, staticRenderFns: NavLink_staticRenderFns }
/* harmony default export */ var component_NavLink_defaultExport = (NavLink_esExports);
// CONCATENATED MODULE: ./src/component/NavLink.vue
var NavLink_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var NavLink___vue_styles__ = null
/* scopeId */
var NavLink___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var NavLink___vue_module_identifier__ = null
var NavLink_Component = NavLink_normalizeComponent(
  NavLink_defaultExport,
  component_NavLink_defaultExport,
  NavLink___vue_styles__,
  NavLink___vue_scopeId__,
  NavLink___vue_module_identifier__
)

/* harmony default export */ var src_component_NavLink_defaultExport = (NavLink_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/component/Nav.vue
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var Nav_defaultExport = ({
  name: 'zan-doc-nav',

  components: _defineProperty({}, src_component_NavLink_defaultExport.name, src_component_NavLink_defaultExport),

  props: {
    navConfig: Array,
    base: {
      type: String,
      default: ''
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-002e15ab","hasScoped":false}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/component/Nav.vue
var Nav_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "zan-doc-nav"
  }, [_c('ul', _vm._l((_vm.navConfig), function(item, index) {
    return _c('li', {
      key: index,
      staticClass: "zan-doc-nav__item"
    }, [_c('zan-doc-nav-link', {
      attrs: {
        "item": item,
        "base": _vm.base
      }
    }), _vm._v(" "), (item.children) ? _c('ul', _vm._l((item.children), function(navItem, index) {
      return _c('li', {
        key: index,
        staticClass: "nav-item"
      }, [_c('zan-doc-nav-link', {
        attrs: {
          "item": navItem,
          "base": _vm.base
        }
      })], 1)
    })) : _vm._e(), _vm._v(" "), _vm._l((item.groups), function(group, index) {
      return (item.groups) ? _c('div', {
        key: index
      }, [_c('div', {
        staticClass: "zan-doc-nav__group-title"
      }, [_vm._v(_vm._s(group.groupName))]), _vm._v(" "), _c('ul', _vm._l((group.list), function(navItem, index) {
        return (!navItem.disabled) ? _c('li', {
          key: index,
          staticClass: "zan-doc-nav__subitem"
        }, [_c('zan-doc-nav-link', {
          attrs: {
            "item": navItem,
            "base": _vm.base
          }
        })], 1) : _vm._e()
      }))]) : _vm._e()
    })], 2)
  }))])
}
var Nav_staticRenderFns = []
var Nav_esExports = { render: Nav_render, staticRenderFns: Nav_staticRenderFns }
/* harmony default export */ var component_Nav_defaultExport = (Nav_esExports);
// CONCATENATED MODULE: ./src/component/Nav.vue
function Nav_injectStyle (ssrContext) {
  __webpack_require__(8)
}
var Nav_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var Nav___vue_styles__ = Nav_injectStyle
/* scopeId */
var Nav___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Nav___vue_module_identifier__ = null
var Nav_Component = Nav_normalizeComponent(
  Nav_defaultExport,
  component_Nav_defaultExport,
  Nav___vue_styles__,
  Nav___vue_scopeId__,
  Nav___vue_module_identifier__
)

/* harmony default export */ var src_component_Nav_defaultExport = (Nav_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/component/Block.vue
//
//
//
//
//
//

/* harmony default export */ var Block_defaultExport = ({
  name: 'zan-doc-block'
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-17e15015","hasScoped":false}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/component/Block.vue
var Block_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "zan-doc-block"
  }, [_vm._t("default")], 2)
}
var Block_staticRenderFns = []
var Block_esExports = { render: Block_render, staticRenderFns: Block_staticRenderFns }
/* harmony default export */ var component_Block_defaultExport = (Block_esExports);
// CONCATENATED MODULE: ./src/component/Block.vue
function Block_injectStyle (ssrContext) {
  __webpack_require__(10)
}
var Block_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var Block___vue_styles__ = Block_injectStyle
/* scopeId */
var Block___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Block___vue_module_identifier__ = null
var Block_Component = Block_normalizeComponent(
  Block_defaultExport,
  component_Block_defaultExport,
  Block___vue_styles__,
  Block___vue_scopeId__,
  Block___vue_module_identifier__
)

/* harmony default export */ var src_component_Block_defaultExport = (Block_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/component/Header.vue
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var Header_defaultExport = ({
  name: 'zan-doc-header',

  props: {
    nav: Object,
    active: String
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-10188d35","hasScoped":false}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/component/Header.vue
var Header_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "zan-doc-header"
  }, [_c('div', {
    staticClass: "zan-doc-header__top"
  }, [_c('a', {
    staticClass: "zan-doc-header__logo",
    attrs: {
      "href": "http://www.youzanyun.com/zanui"
    }
  }), _vm._v(" "), _c('ul', {
    staticClass: "zan-doc-header__top-nav"
  }, _vm._l((_vm.nav), function(value, key) {
    return _c('li', [_c('a', {
      class: {
        active: key === _vm.active
      },
      attrs: {
        "href": value
      }
    }, [_vm._v(_vm._s(key))])])
  }))])])
}
var Header_staticRenderFns = []
var Header_esExports = { render: Header_render, staticRenderFns: Header_staticRenderFns }
/* harmony default export */ var component_Header_defaultExport = (Header_esExports);
// CONCATENATED MODULE: ./src/component/Header.vue
function Header_injectStyle (ssrContext) {
  __webpack_require__(12)
}
var Header_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var Header___vue_styles__ = Header_injectStyle
/* scopeId */
var Header___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Header___vue_module_identifier__ = null
var Header_Component = Header_normalizeComponent(
  Header_defaultExport,
  component_Header_defaultExport,
  Header___vue_styles__,
  Header___vue_scopeId__,
  Header___vue_module_identifier__
)

/* harmony default export */ var src_component_Header_defaultExport = (Header_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/component/Footer.vue
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var Footer_defaultExport = ({
  name: 'zan-doc-footer',

  props: {
    config: Object
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-2233ad7a","hasScoped":false}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/component/Footer.vue
var Footer_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "zan-doc-footer"
  }, [_c('ul', _vm._l((_vm.config.nav), function(value, key) {
    return _c('li', {
      key: key,
      staticClass: "zan-doc-footer__item"
    }, [_c('a', {
      attrs: {
        "href": value
      }
    }, [_vm._v(_vm._s(key))])])
  })), _vm._v(" "), _c('p', {
    staticClass: "zan-doc-footer__copyright"
  }, [_vm._v(_vm._s(_vm.config.copyright))])])
}
var Footer_staticRenderFns = []
var Footer_esExports = { render: Footer_render, staticRenderFns: Footer_staticRenderFns }
/* harmony default export */ var component_Footer_defaultExport = (Footer_esExports);
// CONCATENATED MODULE: ./src/component/Footer.vue
function Footer_injectStyle (ssrContext) {
  __webpack_require__(14)
}
var Footer_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var Footer___vue_styles__ = Footer_injectStyle
/* scopeId */
var Footer___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Footer___vue_module_identifier__ = null
var Footer_Component = Footer_normalizeComponent(
  Footer_defaultExport,
  component_Footer_defaultExport,
  Footer___vue_styles__,
  Footer___vue_scopeId__,
  Footer___vue_module_identifier__
)

/* harmony default export */ var src_component_Footer_defaultExport = (Footer_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/component/Content.vue
//
//
//
//
//
//

/* harmony default export */ var Content_defaultExport = ({
  name: 'zan-doc-content'
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-d05a63fe","hasScoped":false}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/component/Content.vue
var Content_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "zan-doc-content"
  }, [_vm._t("default")], 2)
}
var Content_staticRenderFns = []
var Content_esExports = { render: Content_render, staticRenderFns: Content_staticRenderFns }
/* harmony default export */ var component_Content_defaultExport = (Content_esExports);
// CONCATENATED MODULE: ./src/component/Content.vue
function Content_injectStyle (ssrContext) {
  __webpack_require__(16)
}
var Content_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var Content___vue_styles__ = Content_injectStyle
/* scopeId */
var Content___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Content___vue_module_identifier__ = null
var Content_Component = Content_normalizeComponent(
  Content_defaultExport,
  component_Content_defaultExport,
  Content___vue_styles__,
  Content___vue_scopeId__,
  Content___vue_module_identifier__
)

/* harmony default export */ var src_component_Content_defaultExport = (Content_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/component/Container.vue
//
//
//
//
//
//

/* harmony default export */ var Container_defaultExport = ({
  name: 'zan-doc-container',

  props: {
    hasSimulator: Boolean
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-9406f3ee","hasScoped":false}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/component/Container.vue
var Container_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: ['zan-doc-container', {
      'zan-doc-container--with-simulator': _vm.hasSimulator
    }]
  }, [_vm._t("default")], 2)
}
var Container_staticRenderFns = []
var Container_esExports = { render: Container_render, staticRenderFns: Container_staticRenderFns }
/* harmony default export */ var component_Container_defaultExport = (Container_esExports);
// CONCATENATED MODULE: ./src/component/Container.vue
function Container_injectStyle (ssrContext) {
  __webpack_require__(18)
}
var Container_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var Container___vue_styles__ = Container_injectStyle
/* scopeId */
var Container___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Container___vue_module_identifier__ = null
var Container_Component = Container_normalizeComponent(
  Container_defaultExport,
  component_Container_defaultExport,
  Container___vue_styles__,
  Container___vue_scopeId__,
  Container___vue_module_identifier__
)

/* harmony default export */ var src_component_Container_defaultExport = (Container_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/component/FooterNav.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var FooterNav_defaultExport = ({
  name: 'zan-doc-footer-nav',

  props: {
    navConfig: Array
  },

  data: function data() {
    return {
      nav: [],
      currentPath: null,
      leftNav: null,
      rightNav: null
    };
  },


  watch: {
    '$route.path': function $routePath() {
      this.setNav();
      this.updateNav();
    }
  },

  methods: {
    setNav: function setNav() {
      var nav = this.navConfig;
      for (var i = 0; i < nav.length; i++) {
        var navItem = nav[i];
        if (!navItem.groups) {
          this.nav.push(nav[i]);
        } else {
          for (var j = 0; j < navItem.groups.length; j++) {
            this.nav = this.nav.concat(navItem.groups[j].list);
          }
        }
      }
    },
    updateNav: function updateNav() {
      var baseUrl = '/component';
      var currentIndex = void 0;

      this.currentPath = this.$route.path.slice(baseUrl.length);

      for (var i = 0, len = this.nav.length; i < len; i++) {
        if (this.nav[i].path === this.currentPath) {
          currentIndex = i;
          break;
        }
      }
      this.leftNav = this.nav[currentIndex - 1];
      this.rightNav = this.nav[currentIndex + 1];
    },
    handleNavClick: function handleNavClick(direction) {
      this.$router.push('/component' + (direction === 'prev' ? this.leftNav.path : this.rightNav.path));
    }
  },

  created: function created() {
    this.setNav();
    this.updateNav();
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-6b042f90","hasScoped":false}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/component/FooterNav.vue
var FooterNav_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "zan-doc-footer-nav"
  }, [(_vm.leftNav) ? _c('a', {
    staticClass: "zan-doc-footer-nav__link zan-doc-footer-nav__left",
    attrs: {
      "href": "javascript:void(0)"
    },
    on: {
      "click": function($event) {
        _vm.handleNavClick('prev')
      }
    }
  }, [_c('div', {
    staticClass: "zan-doc-footer-nav__arrow-left"
  }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.leftNav.title))])]) : _vm._e(), _vm._v(" "), (_vm.rightNav) ? _c('a', {
    staticClass: "zan-doc-footer-nav__link zan-doc-footer-nav__right",
    attrs: {
      "href": "javascript:void(0)"
    },
    on: {
      "click": function($event) {
        _vm.handleNavClick('next')
      }
    }
  }, [_c('span', [_vm._v(_vm._s(_vm.rightNav.title))]), _vm._v(" "), _c('div', {
    staticClass: "zan-doc-footer-nav__arrow-right"
  })]) : _vm._e()])
}
var FooterNav_staticRenderFns = []
var FooterNav_esExports = { render: FooterNav_render, staticRenderFns: FooterNav_staticRenderFns }
/* harmony default export */ var component_FooterNav_defaultExport = (FooterNav_esExports);
// CONCATENATED MODULE: ./src/component/FooterNav.vue
function FooterNav_injectStyle (ssrContext) {
  __webpack_require__(20)
}
var FooterNav_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var FooterNav___vue_styles__ = FooterNav_injectStyle
/* scopeId */
var FooterNav___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var FooterNav___vue_module_identifier__ = null
var FooterNav_Component = FooterNav_normalizeComponent(
  FooterNav_defaultExport,
  component_FooterNav_defaultExport,
  FooterNav___vue_styles__,
  FooterNav___vue_scopeId__,
  FooterNav___vue_module_identifier__
)

/* harmony default export */ var src_component_FooterNav_defaultExport = (FooterNav_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/component/Simulator.vue
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var Simulator_defaultExport = ({
  name: 'zan-doc-simulator',

  props: {
    src: String
  },

  data: function data() {
    return {
      scrollTop: window.scrollY,
      iframeHostName: ''
    };
  },
  mounted: function mounted() {
    var _this = this;

    window.addEventListener('scroll', function () {
      _this.scrollTop = window.scrollY;
    });

    var iframe = this.$refs.iframe;

    if (iframe) {
      iframe.onload = function () {
        _this.onSrcChanged();
      };
    }
  },


  watch: {
    src: function src() {
      this.onSrcChanged();
    }
  },

  computed: {
    isFixed: function isFixed() {
      return this.scrollTop > 60;
    }
  },

  methods: {
    reloadIframe: function reloadIframe() {
      var iframe = this.$refs.iframe;

      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.location.reload();
      }
    },
    onSrcChanged: function onSrcChanged() {
      var iframe = this.$refs.iframe;

      if (iframe && iframe.contentWindow) {
        this.iframeHostName = iframe.contentWindow.location.host;
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-3dc5040c","hasScoped":false}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/component/Simulator.vue
var Simulator_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: ['zan-doc-simulator', {
      'zan-doc-simulator-fixed': _vm.isFixed
    }]
  }, [_c('div', {
    staticClass: "zan-doc-simulator__nav"
  }, [_c('div', {
    staticClass: "zan-doc-simulator__url"
  }, [_vm._v(_vm._s(_vm.iframeHostName))]), _vm._v(" "), _c('div', {
    staticClass: "zan-doc-simulator__reload",
    on: {
      "click": _vm.reloadIframe
    }
  })]), _vm._v(" "), _c('iframe', {
    ref: "iframe",
    attrs: {
      "src": _vm.src,
      "frameborder": "0"
    }
  })])
}
var Simulator_staticRenderFns = []
var Simulator_esExports = { render: Simulator_render, staticRenderFns: Simulator_staticRenderFns }
/* harmony default export */ var component_Simulator_defaultExport = (Simulator_esExports);
// CONCATENATED MODULE: ./src/component/Simulator.vue
function Simulator_injectStyle (ssrContext) {
  __webpack_require__(22)
}
var Simulator_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var Simulator___vue_styles__ = Simulator_injectStyle
/* scopeId */
var Simulator___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Simulator___vue_module_identifier__ = null
var Simulator_Component = Simulator_normalizeComponent(
  Simulator_defaultExport,
  component_Simulator_defaultExport,
  Simulator___vue_styles__,
  Simulator___vue_scopeId__,
  Simulator___vue_module_identifier__
)

/* harmony default export */ var src_component_Simulator_defaultExport = (Simulator_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/component/DemoBlock.vue
//
//
//
//
//
//
//

/* harmony default export */ var DemoBlock_defaultExport = ({
  name: 'zan-doc-demo-block',

  props: {
    title: String
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-71af2972","hasScoped":false}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/component/DemoBlock.vue
var DemoBlock_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "zan-doc-demo-block"
  }, [_c('h2', {
    staticClass: "zan-doc-demo-block__subtitle"
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _vm._t("default")], 2)
}
var DemoBlock_staticRenderFns = []
var DemoBlock_esExports = { render: DemoBlock_render, staticRenderFns: DemoBlock_staticRenderFns }
/* harmony default export */ var component_DemoBlock_defaultExport = (DemoBlock_esExports);
// CONCATENATED MODULE: ./src/component/DemoBlock.vue
function DemoBlock_injectStyle (ssrContext) {
  __webpack_require__(24)
}
var DemoBlock_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var DemoBlock___vue_styles__ = DemoBlock_injectStyle
/* scopeId */
var DemoBlock___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var DemoBlock___vue_module_identifier__ = null
var DemoBlock_Component = DemoBlock_normalizeComponent(
  DemoBlock_defaultExport,
  component_DemoBlock_defaultExport,
  DemoBlock___vue_styles__,
  DemoBlock___vue_scopeId__,
  DemoBlock___vue_module_identifier__
)

/* harmony default export */ var src_component_DemoBlock_defaultExport = (DemoBlock_Component.exports);

// CONCATENATED MODULE: ./src/index.js
/* harmony export (immutable) */ __webpack_exports__["default"] = install;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);












var components = [src_component_Nav_defaultExport, src_component_Header_defaultExport, src_component_Footer_defaultExport, __src_ZanDoc_defaultExport, src_component_Block_defaultExport, src_component_Content_defaultExport, src_component_Container_defaultExport, src_component_FooterNav_defaultExport, src_component_Simulator_defaultExport, src_component_DemoBlock_defaultExport];

function install() {
  components.map(function (Component) {
    __WEBPACK_IMPORTED_MODULE_0_vue___default.a.component(Component.name, Component);
  });
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("78cbd72d", content, true);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "body{min-width:1100px;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Helvetica Neue,Helvetica,Arial,sans-serif}body,code{overflow-x:auto}code{display:block;font-size:13px;font-weight:400;line-height:21px;border-radius:4px;margin-bottom:25px;white-space:pre-wrap;background-color:#f5f7fa;color:#455a64;padding:18px 10px 18px 20px;font-family:Source Code Pro,Monaco,Inconsolata,monospace}.zan-doc{background-color:#ececec;background-image:-webkit-gradient(linear,left top,left bottom,from(#031a49),to(#38f));background-image:linear-gradient(180deg,#031a49,#38f)}.zan-doc-table{width:100%;font-size:13px;line-height:1.5;margin-bottom:45px;background-color:#fff;border-collapse:collapse;color:#333;font-family:Source Code Pro,Monaco,Inconsolata,monospace}.zan-doc-table th{padding:8px 10px;text-align:left;background-color:#f5f5f5;border:1px solid #eaeaea}.zan-doc-table th:first-child{padding-left:10px}.zan-doc-table td{padding:10px;border:1px solid #eaeaea}", ""]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles(parentId, list) {
  var styles = [];
  var newStyles = {};
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    };
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] });
    } else {
      newStyles[id].parts.push(part);
    }
  }
  return styles;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("7648ded8", content, true);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".zan-doc-nav{padding:20px 0;min-width:240px;max-width:240px;border-right:1px solid #eaeaea}@media (max-width:1300px){.zan-doc-nav{min-width:220px;max-width:220px}}.zan-doc-nav__item a,.zan-doc-nav__subitem a{margin:0;display:block;font-size:16px;padding:8px 20px;line-height:24px;-webkit-transition:all .3s;transition:all .3s;color:#333}.zan-doc-nav__item a.active,.zan-doc-nav__subitem a.active{color:#38f;background-color:#f2f2f2}.zan-doc-nav__subitem a{font-size:14px;padding-left:34px}.zan-doc-nav__subitem a:hover{color:#38f}.zan-doc-nav__group-title{font-size:12px;line-height:26px;padding-left:22px;color:#666}@media (max-width:1300px){.zan-doc-nav{min-width:220px;max-width:220px}.zan-doc-nav__item a,.zan-doc-nav__subitem a{line-height:22px}.zan-doc-nav__subitem a{font-size:13px;padding-left:30px}}", ""]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(11);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("1d521c83", content, true);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".zan-doc-block{display:-webkit-box;display:-ms-flexbox;display:flex;margin-bottom:20px}.zan-doc-block .highlight{-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-sizing:border-box;box-sizing:border-box}.zan-doc-block .highlight pre{word-break:break-all}", ""]);

// exports


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(13);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("0a015d54", content, true);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".zan-doc-header{width:100%}.zan-doc-header__top{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;background-color:#fff;padding:0 30px;height:60px;line-height:60px;-webkit-box-shadow:0 1px 4px rgba(0,0,0,.1);box-shadow:0 1px 4px rgba(0,0,0,.1)}.zan-doc-header__top-nav{-webkit-box-flex:1;-ms-flex:1;flex:1;text-align:right}.zan-doc-header__top-nav li{display:inline-block}.zan-doc-header__top-nav a{margin:0 20px;font-size:15px;display:block;color:#333}.zan-doc-header__top-nav a.active,.zan-doc-header__top-nav a:hover{color:#38f}.zan-doc-header__logo{display:block;width:76px;height:20px;background-image:url(https://img.yzcdn.cn/upload_files/2017/04/20/FjwR1mraVIqtHWb8YWDW_YzQ_Kh2.png);background-size:contain;background-repeat:no-repeat}.zan-doc-header__bottom{height:50px;line-height:50px}.zan-doc-header__bottom-nav{text-align:center}.zan-doc-header__bottom-nav li{display:inline-block}.zan-doc-header__bottom-nav a{color:#fff;opacity:.8;display:block;padding:0 20px;font-size:14px}.zan-doc-header__bottom-nav a.active{background-color:hsla(0,0%,100%,.1)}.zan-doc-header__bottom-nav a.active,.zan-doc-header__bottom-nav a:hover{opacity:1}", ""]);

// exports


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(15);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("2cd650ad", content, true);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".zan-doc-footer{display:-webkit-box;display:-ms-flexbox;display:flex;height:72px;margin-top:40px;background-color:#34383b;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.zan-doc-footer__item{float:left;margin:0 20px}.zan-doc-footer__item a{display:block;color:#e5e5e5;font-size:12px;line-height:72px}.zan-doc-footer__copyright{color:#999;font-size:12px;line-height:72px;margin-left:50px}", ""]);

// exports


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(17);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("ed7998cc", content, true);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".zan-doc-content{-webkit-box-flex:1;-ms-flex:1;flex:1}.zan-doc-content a{color:#38f}.zan-doc-content section{padding:0 30px;overflow:hidden}.zan-doc-content section>h1,.zan-doc-content section>h2,.zan-doc-content section>h3,.zan-doc-content section>h4,.zan-doc-content section>h5,.zan-doc-content section>h6{line-height:1.5;font-weight:400;margin:20px 0 10px;color:#333}.zan-doc-content section>h1{font-size:36px}.zan-doc-content section>h2{font-size:30px}.zan-doc-content section>h3{font-size:22px}.zan-doc-content section>h4{font-size:18px}.zan-doc-content section>h5{font-size:14px}.zan-doc-content section>h6{font-size:14px;color:#666}.zan-doc-content section>p{margin:14px 0;font-size:14px;line-height:20px;color:#666}.zan-doc-content section>ol li,.zan-doc-content section>ul li{color:#666;font-size:14px;line-height:20px;margin:10px 0 10px 20px;padding-left:20px;position:relative}.zan-doc-content section>ol li:before,.zan-doc-content section>ul li:before{content:\"\";position:absolute;top:6px;left:0;width:8px;height:8px;-webkit-box-sizing:border-box;box-sizing:border-box;border:2px solid #999;border-radius:50%}.zan-doc-content section>ol li li,.zan-doc-content section>ul li li{margin-left:0}.zan-doc-content section .zan-doc-table code,.zan-doc-content section li>code,.zan-doc-content section p>code{margin:0 2px;padding:2px 7px;display:inline-block;vertical-align:middle}.zan-doc-content section .zan-doc-table code{padding:0 10px}", ""]);

// exports


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(19);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("93595468", content, true);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".zan-doc-container{display:-webkit-box;display:-ms-flexbox;display:flex;overflow:hidden;border-radius:6px;-webkit-box-sizing:border-box;box-sizing:border-box;background-color:#fff;margin:30px 30px 50px}.zan-doc-container--with-simulator{margin-right:435px}@media (max-width:1300px){.zan-doc-container--with-simulator{margin-right:380px}}", ""]);

// exports


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(21);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("63ea25d2", content, true);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".zan-doc-footer-nav{display:-webkit-box;display:-ms-flexbox;display:flex;padding:24px 40px;border-top:1px solid #eaeaea}.zan-doc-footer-nav__link{-webkit-box-flex:1;-ms-flex:1;flex:1;font-size:16px;line-height:1.5;color:#38f}.zan-doc-footer-nav__link .van-icon{font-size:12px;line-height:16px}.zan-doc-footer-nav__link span{vertical-align:middle}.zan-doc-footer-nav__left,.zan-doc-footer-nav__right{padding:0 20px;position:relative}.zan-doc-footer-nav__right{text-align:right}.zan-doc-footer-nav__arrow-left,.zan-doc-footer-nav__arrow-right{top:50%;width:8px;height:8px;position:absolute;border:solid #38f;border-width:0 1px 1px 0}.zan-doc-footer-nav__arrow-left{left:0;-webkit-transform:rotate(135deg) translateY(50%);transform:rotate(135deg) translateY(50%)}.zan-doc-footer-nav__arrow-right{right:0;-webkit-transform:rotate(-45deg) translateY(-50%);transform:rotate(-45deg) translateY(-50%)}", ""]);

// exports


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(23);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("e9cd3ed6", content, true);

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".zan-doc-simulator{z-index:1;overflow:hidden;position:absolute;border-radius:6px;background:#f2f2f4;-webkit-box-sizing:border-box;box-sizing:border-box;right:30px;width:375px;height:620px;min-width:375px;top:90px;-webkit-box-shadow:0 2px 3px hsla(0,0%,4%,.1),0 0 0 1px hsla(0,0%,4%,.1);box-shadow:0 2px 3px hsla(0,0%,4%,.1),0 0 0 1px hsla(0,0%,4%,.1)}@media (max-width:1300px){.zan-doc-simulator{width:320px;height:560px;min-width:320px}}@media (max-width:1100px){.zan-doc-simulator{left:750px;right:auto}}@media (min-width:1300px){.zan-doc-simulator-fixed{top:30px;position:fixed}}.zan-doc-simulator iframe{width:100%;height:556px}@media (max-width:1300px){.zan-doc-simulator iframe{height:496px}}.zan-doc-simulator__nav{height:63px;background:url(\"data:image/png;base64,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\") no-repeat;background-size:100%;border-bottom:1px solid #e5e5e5}.zan-doc-simulator__url{left:40px;top:25px;right:40px;font-size:15px;position:absolute;text-align:center;font-weight:700;line-height:28px}@media (max-width:1300px){.zan-doc-simulator__url{top:21px;line-height:24px}}.zan-doc-simulator__reload{top:25px;right:10px;width:28px;height:28px;cursor:pointer;position:absolute}", ""]);

// exports


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(25);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("6af19e16", content, true);

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".zan-doc-demo-block__title{padding:15px;font-size:16px;line-height:1.5}.zan-doc-demo-block__title+.zan-doc-demo-block .zan-doc-demo-block__subtitle{padding-top:0}.zan-doc-demo-block__subtitle{font-size:14px;color:#999;padding:30px 15px 10px}", ""]);

// exports


/***/ })
/******/ ]);