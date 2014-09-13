(function(window, undefined) {
'use strict';

var IC = {};

// Utils
var 
  win = window,
  doc = win.document,
  _slice = Array.prototype.slice,

  util = IC.util = {
    typeOf: function(elem) {
      return ({}).toString.call(elem).slice(8, -1);
    },

    isIterable: function(elements) {
      return elements.length && this.typeOf(elements) !== 'string' ? true : false;
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




  var css = {
    get: function(elem, prop) {
      return doc.defaultView.getComputedStyle(elem).getPropertyValue(prop);
    },

    set: function(elem, props) {
      for (var p in props) {
        if (props.hasOwnProperty(p)) {
          elem.style[p] = props[p];
        }
      }
    },

    width: function(elem) {
      return elem.getBoundingClientRect().width;
    },

    height: function(elem) {
      return elem.getBoundingClientRect().height;
    },

    position: function(elem) {
      if (!elem) { return; }

      var rect = elem.getBoundingClientRect();

      return {
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left
      };
    }
  };


  var events = {
    add: function(elem, type, fn) {
      return elem.addEventListener(type, fn, false);
    },

    remove: function(elem, type, fn) {
      return elem.removeEventListener(type, fn, false);
    }
  };



  IC.siteHeader = (function() {
  var 
    header = doc.getElementById('site-header'),
    size = 1.25, a = 0,
    bodyFontSize = Number(css.get(doc.body, 'font-size').slice(0, -2)),
    headFontSize = Number(css.get(header, 'font-size').slice(0, -2)) / bodyFontSize,
    headerHeight = css.height(header),
    currentSize = a,
    lastSize = 0;

    // css.set(header, {'font-size': size+'em'});
    
    // events.add(win, 'scroll', function() {
    //   if (win.scrollY - headerHeight >= headerHeight * 0.75) {
    //     header.classList.remove('grow-header');
    //   } else {
    //     header.classList.add('grow-header');
    //   }

    //   return;
    // });
  }).call(IC);



  // Leadertext
  // var leadertextItems = util.findAll('.leadertext-item');
  // var time = 500;

  // win.setTimeout(function() {
  //   if (leadertextItems.length) {
  //     [].forEach.call(leadertextItems, function(el, i) {
  //       if (i !== 0) {
  //         time += (time*i)/4;
  //       }
  //       win.setTimeout(function() { leadertextItems[i].classList.add('slide-from-right'); }, time );
  //     });
  //   }
  // }, 1500);


  // Parallax fade.
  // var banner = util.find('.leaderboard');
  // var bannerTop = Math.abs(banner.getBoundingClientRect().top); // about 50
  // var bannerHeight = (banner.getBoundingClientRect().height + bannerTop) * .58;
  // var inner = banner.querySelector('.inner');

  // function changeOpacity(el, val) {
  //   el.style.opacity = val;
  // }

  // win.addEventListener('scroll', function(e) {
  //   var curPos = (doc.body.scrollTop/bannerHeight).toFixed(2);
    
  //   if (curPos < 1 && curPos >= 0) {
  //     // console.log('I have scrolled ' + (curPos*100).toFixed(2) + ' percent in relation to the banner.');
  //     if (curPos === 0) {
  //       changeOpacity(inner, 1);
  //       return;
  //     }

  //     changeOpacity(inner, (1 - curPos).toFixed(2));
  //   }
  // }, false);
})(this);
