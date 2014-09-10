(function(window, document, undefined) {
'use strict';

var IC = {};

// Utils
var 
  win = window,
  doc = win.document,

  util = IC.util = {
    typeOf: function(elem) {
      return ({}).toString.call(elem).slice(8, -1);
    },

    find: function(selector, context) {
      return (context || doc).querySelector(selector);
    },

    findAll: function(selector, context) {
      return (context || doc).querySelectorAll(selector);
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
    bodyFontSize = Number(css.get(document.body, 'font-size').slice(0, -2)),
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
})(this, document);