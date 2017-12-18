// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      function localRequire(x) {
        return newRequire(localRequire.resolve(x));
      }

      localRequire.resolve = function (x) {
        return modules[name][1][x] || x;
      };

      var module = cache[name] = new newRequire.Module;
      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({4:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const n="\nimport { createTile } from 'redux-tiles';\n\nconst authTile = createTile({\n  type: ['user', 'auth'],\n  fn: ({ params, api }) => api.post('/login', params)\n});\n",e="\nconst USER_AUTH_START = 'USER_AUTH_START';\nconst USER_AUTH_SUCCESS = 'USER_AUTH_SUCCESS';\nconst USER_AUTH_FAILURE = 'USER_AUTH_FALURE';\n\nexport function authUser(params) {\n  return (dispatch, getState, { api }) => {\n    dispatch({\n      type: USER_AUTH_START\n    });\n\n    return api.post('/login', params)\n      .then(data => dispatch({\n        type: USER_AUTH_SUCCESS,\n        payload: { data }\n      }))\n      .catch(error => dispatch({\n        type: USER_AUTH_FAILURE,\n        error\n      }));\n  }\n}\n\nexport function reducer(state, action) {\n  switch (action.type) {\n    case USER_AUTH_START:\n      return {\n        isPending: true,\n        fetched: false,\n        data: null,\n        error: null\n      };\n    case USER_AUTH_SUCCESS:\n      return {\n        isPending: false,\n        fetched: true,\n        data: { data: action.payload },\n        error: null\n      });\n    case USER_AUTH_FAILURE:\n      return {\n        isPending: false,\n        fetched: true,\n        data: null,\n        error: action.error\n      });\n    default:\n      return state;\n  }\n}\n";exports.default={reduxTiles:n,vanilla:e};
},{}],5:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const n="\nimport { createTile } from 'redux-tiles';\n\nconst userDataTile = createTile({\n  type: ['user', 'data'],\n  fn: ({ api }) => api.get('/user/data'),\n  caching: true\n});\n",e="\nconst USER_DATA_FETCH_START = 'USER_DATA_FETCH_START';\nconst USER_DATA_FETCH_SUCCESS = 'USER_DATA_FETCH_SUCCESS';\nconst USER_DATA_FETCH_FAILURE = 'USER_DATA_FETCH_FAILURE';\n\nCONST USER_FETCH_CACHING_ID = 'USER_FETCH_CACHING_ID';\n\nexport function fetchUserData() {\n  return (dispatch, getState, { api, cache }) => {\n    dispatch({\n      type: USER_DATA_FETCH_START\n    });\n\n    if (cache[USER_FETCH_CACHING_ID]) {\n      return cache[USER_FETCH_CACHING_ID];\n    }\n\n    const promise = api\n      .get('/user/data')\n      .then(data => dispatch({\n        type: USER_DATA_FETCH_SUCCESS,\n        payload: { data }\n      }))\n      .catch(error => dispatch({\n        type: USER_DATA_FETCH_FAILURE,\n        error\n      }))\n      .finally(() => {\n        case[USER_FETCH_CACHING_ID] = null;\n      });\n\n    case[USER_FETCH_CACHING_ID] = promise;\n\n    return promise;\n  };\n}\n\nexport function reducer(state, action) {\n  switch (action.type) {\n    case USER_DATA_FETCH_START:\n      return {\n        isPending: true,\n        fetched: false,\n        data: null,\n        error: null\n      };\n    case USER_DATA_FETCH_SUCCESS:\n      return {\n        isPending: false,\n        fetched: true,\n        data: action.payload,\n        error: null\n      });\n    case USER_DATA_FETCH_FAILURE:\n      return {\n        isPending: false,\n        fetched: true,\n        data: null,\n        error: action.error\n      });\n    default:\n      return state;\n  }\n}\n";exports.default={reduxTiles:n,vanilla:e};
},{}],6:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const n="\nimport { createTile } from 'redux-tiles';\n\nconst storyTile = createTile({\n  type: ['user', 'auth'],\n  fn: ({ params, api }) => api.post(`/stories/${params.id}`),\n  nesting: (params) => [params.id]\n});\n",a="\nconst STORY_TILE_START = 'STORY_TILE_START';\nconst STORY_TILE_SUCCESS = 'STORY_TILE_SUCCESS';\nconst STORY_TILE_FAILURE = 'STORY_TILE_FAILURE';\n\nexport function fetchStory(params) {\n  return (dispatch, getState, { api }) => {\n    dispatch({\n      type: STORY_TILE_START,\n      payload: { id: params.id }\n    });\n\n    return api.post(`/stories/${params.id}`)\n      .then(data => dispatch({\n        type: STORY_TILE_SUCCESS,\n        payload: { data, id: params.id }\n      }))\n      .catch(error => dispatch({\n        type: STORY_TILE_FAILURE,\n        payload: { id: params.id },\n        error\n      }));\n  }\n}\n\nexport function reducer(state, action) {\n  switch (action.type) {\n    case STORY_TILE_START:\n      return {\n        ...state,\n        [action.payload.id]: {\n          isPending: true,\n          fetched: false,\n          data: null,\n          error: null\n        }\n      };\n    case STORY_TILE_SUCCESS:\n      return {\n        ...state,\n        [action.payload.id]: {\n          isPending: false,\n          fetched: true,\n          data: { data: action.payload },\n          error: null\n        }\n      };\n    case STORY_TILE_FAILURE:\n      return {\n        ...state,\n        [action.payload.id]: {\n          isPending: false,\n          fetched: true,\n          data: null,\n          error: action.error\n        }\n      };\n    default:\n      return state;\n  }\n}\n";exports.default={reduxTiles:n,vanilla:a};
},{}],3:[function(require,module,exports) {
"use strict";function e(e){return e&&e.__esModule?e:{default:e}}var t=require("./js/basic"),c=e(t),a=require("./js/caching"),i=e(a),n=require("./js/nesting"),r=e(n);const s={basic:c.default,caching:i.default,nesting:r.default},l=document.getElementById("redux-tiles-code"),d=document.getElementById("vanilla-code"),u=document.querySelectorAll(".choice"),o=Array.from(u);o.forEach(e=>{const t=e.getAttribute("data-value"),c=s[t];e.addEventListener("click",()=>{l.innerHTML=c.reduxTiles,d.innerHTML=c.vanilla,o.forEach(e=>{e.classList.remove("active")}),e.classList.add("active")})});
},{"./js/basic":4,"./js/caching":5,"./js/nesting":6}]},{},[3])