(function(window, undefined) {
'use strict';

var IC = {};

// Utils
// -----------------------------
var 
  win = window,
  doc = win.document,
  _slice = Array.prototype.slice,

  util = IC.util = {
    typeOf: function(elem) {
      return ({}).toString.call(elem).slice(8, -1);
    },

    isIterable: function(elements) {
      return elements.length && this.typeOf(elements) !== 'String' ? true : false;
    },

    find: function(selector, context) {
      return (context || doc).querySelector(selector);
    },

    findAll: function(selector, context) {
      return _slice.call((context || doc).querySelectorAll(selector));
    },

    siblings: function(element) {
      var siblings = _slice.call(element.parentNode.childNodes) || [];
      return siblings.filter(function(el) { return el && el.nodeType === 1 && el !== element; });
    },

    on: function(element, type, callback) {
      var types, elements;

      if (!element || !type || !callback) { return; }

      if (element.addEventListener) {
        types = type.split(' ');

        if (types.length > 1) {
          types.forEach(function(t) {
            element.addEventListener(t, callback, false);
          });
        } else {
          element.addEventListener(type, callback, false);
        }
      }
    },

    off: function(element, type, callback) {
      var types;

      if (!element || !type || !callback) { return; }

      if (element.removeEventListener) {
        types = type.split(' ');

        if (types.length > 1) {
          types.forEach(function(t) {
            element.removeEventListener(t, callback, false);
          });
        } else {
          element.removeEventListener(type, callback, false);
        }
      }
    }
  };



// Pages
// -----------------------------
var 
  pages = IC.pages = {
    initialize: function() {
      var ids, entries;

      if (!this._entries) {
        ids = ['projects', 'contact', 'about'];
        entries = this._entries = {};

        ids.forEach(function(id) {
          var element = doc.getElementById(id);

          if (!entries[id]) {
            entries[id] = {
              element: element,
              top: element.offsetTop
            };
          }
        });
      }
    },

    get: function(id) {
      if (this._entries && this._entries[id]) {
        return this._entries[id];
      }
    },

    toJSON: function() {
      return this._entries;
    },

    toArray: function() {
      var result = [], p;

      for(p in this._entries) {
        if (this._entries.hasOwnProperty(p)) {
          result.push(this._entries[p]);
        }
      }

      return result;
    }
  };



// Site Header
// -----------------------------
var 
  siteHeader = doc.getElementById('site-header'),
  siteHeaderHeight = Math.round(siteHeader.getBoundingClientRect().height);



// Navigation - Mobile
// -----------------------------
var 
  navToggle = util.find('.nav-toggle-mobile'),
  mobileNav = util.find('.mobile-nav');

  function toggleTopNav(e) {
    e.preventDefault();
    mobileNav.classList.toggle('on');
    e.target.classList.toggle('on');
  }

  navToggle.addEventListener('click', toggleTopNav, false);



// Navigation - Desktop
// -----------------------------
var 
  desktopNav = util.find('.desktop-nav');

  util.on(win, 'load', function initDesktopNav() {
    util.on(desktopNav, 'click', function(e) {
      var idSelector = '', page;

      if (e && e.target.tagName.toLowerCase() === 'a') {
        e.preventDefault();
        idSelector = e.target.hash && e.target.hash.slice(1);

        if (idSelector === 'home' || !idSelector) {
          win.scrollTo(0, 0);
        } else {
          page = pages.get(idSelector);
          win.scrollTo(0, Math.round((page && page.top || siteHeaderHeight) - siteHeaderHeight));
        }
      }
    });

    pages.initialize();
  });



// Recent Projects
// -----------------------------
var 
  recentProjects = util.find('.recent-projects'),
  originalActive = util.find('.project.active', recentProjects),
  projects = util.findAll('.project', recentProjects);

  projects.length && projects.forEach(function(project) {
    util.on(project, 'mouseenter', function(e) {
      var target = e.target;

      if (target && target.nodeType === 1) {
        if (!target.classList.contains('active')) {
          util.siblings(target).forEach(function(el) { el && el.classList.remove('active'); });
          target.classList.add('active');
        }
      }
    });
  });

  util.on(recentProjects, 'mouseleave', function() {
    projects.forEach(function(el) { el && el.classList.remove('active'); });
    originalActive.classList.add('active');
  });
})(this);
