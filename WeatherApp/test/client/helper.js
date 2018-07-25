// switch our environment to test from dev
process.env.NODE_ENV = 'test';
// allows us to write test in es6, babel will turn it to es5
require('babel-register')();


// a function that returns null, so it won't load fies with those extensions
function nullFunc() {
  return null;
}

require.extensions['.css'] = nullFunc;
require.extensions['.scss'] = nullFunc;
require.extensions['.png'] = nullFunc;
require.extensions['.jpg'] = nullFunc;

// using it for enzyme, a utility for testing in react
const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

configure({ adapter: new Adapter() });


// the fake dom to run tests on
const { JSDOM } = require('jsdom');

// our basic html page on which load test components
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');

//fake window
const { window } = jsdom;

//a fake local storage for fake window
window.localStorage = (function(){
  var storage = {};

  return {
    getItem: function(key) {
      return storage[key];
    },
    removeItem: function(key) {
      delete storage[key];
    },
    setItem: function(key, item) {
      storage[key] = item;
    }
  };
})();

function Map() {
  this.getCenter = function() {};
}
function Marker() {
  this.setMap = function() {};
}
function Autocomplete() {}
global.google = {
  maps: {
    Map,
    Marker,
    places: {
      Autocomplete
    }
  }
};

//copy everything from window onto global, which is node's version of window
function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}
//attach these things globally so you can use it server-side
global.atob = require('atob');
global.window = window;
global.document = window.document;
//the navigator is the browser
global.navigator = {
  userAgent: 'node.js'
};
copyProps(window, global);

//mike doesn't know what this is for but it is in the documentation
documentRef = document; //eslint-disable-line no-undef
