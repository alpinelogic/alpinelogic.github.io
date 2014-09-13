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



// Main Navigation
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
